import { Injectable, InjectionToken, Inject } from '@angular/core';
import { NgxTranslateLoader } from './ngx-translate-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

export const TRANSLATION_PROVIDER = new InjectionToken('Injection token for translation providers.');

export interface TranslationProvider {
  name: string;
  source: string;
}

@Injectable()
export class NgxTranslateService {

  defaultLang = 'en';
  userLang = 'en';
  customLoader: NgxTranslateLoader;

  constructor(public translate: TranslateService, @Inject(TRANSLATION_PROVIDER) providers: TranslationProvider[]) {
    this.userLang = translate.getBrowserLang() || this.defaultLang;
    translate.setDefaultLang(this.defaultLang);
    this.customLoader = <NgxTranslateLoader> this.translate.currentLoader;
    this.useLang(this.userLang);
    if (providers && providers.length > 0) {
      for (const provider of providers) {
        this.addTranslationFolder(provider.name, provider.source);
      }
    }
  }

  addTranslationFolder(name: string = '', path: string = '') {
    if (!this.customLoader.providerRegistered(name)) {
      this.customLoader.registerProvider(name, path);
      if (this.userLang !== this.defaultLang) {
        this.translate.getTranslation(this.defaultLang).subscribe(() => {
          this.translate.getTranslation(this.userLang).subscribe(
            () => {
              this.translate.use(this.userLang);
            }
          );
        });
      } else {
        this.translate.getTranslation(this.userLang).subscribe(
          () => {
            this.translate.use(this.userLang);
          }
        );
      }
    }
  }

  useLang(lang: string): Observable<any> {
    this.customLoader.init(lang);
    return this.translate.use(lang);
  }

  get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return this.translate.get(key, interpolateParams);
  }
}
