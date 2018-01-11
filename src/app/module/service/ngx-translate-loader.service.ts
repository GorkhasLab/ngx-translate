import {HttpClient} from '@angular/common/http';
import {TranslateLoader} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import {NgxTranslateConfig} from '../models/ngx-translate-config';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {Observer} from 'rxjs/Observer';
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class NgxTranslateLoader implements TranslateLoader {

  private prefix = 'i18n';
  private suffix = '.json';
  private providers: NgxTranslateConfig[] = [];
  private queue: string[][] = [];

  constructor(private http: HttpClient, private logger: NGXLogger) {
  }

  getComponentToFetch(lang: string): Observable<any>[] {
    const observableBatch: Observable<any>[] = [];
    if (!this.queue[lang]) {
      this.queue[lang] = [];
    }
    this.providers.forEach((component) => {
      if (!this.isComponentInQueue(lang, component.name)) {
        this.queue[lang].push(component.name);
        const translateObservable = this.http.get(`${component.path}/${this.prefix}/${lang}${this.suffix}`);
        translateObservable.subscribe(value => {
          component.json[lang] = value;
        });
        observableBatch.push(translateObservable);
      }
    });
    return observableBatch;
  }

  isComponentInQueue(lang: string, name: string) {
    return !!(this.queue[lang] || []).find((x: string) => x === name);
  }

  getFullTranslationJSON(lang: string) {
    let fullTranslation = '';
    const cloneList = this.providers.slice(0);
    cloneList.reverse().forEach((component) => {
      if (component.json && component.json[lang]) {
        fullTranslation += JSON.stringify(component.json[lang]);
      }
    });
    if (fullTranslation !== '') {
      return JSON.parse(fullTranslation.replace(/}{/g, ','));
    }
  }

  getTranslation(lang: string): Observable<any> {
    this.logger.debug('GET-| Translation for lang', lang);
    const observableBatch = this.getComponentToFetch(lang);
    return Observable.create((observer: Observer<any>) => {
      this.logger.debug('Batch Size', observableBatch.length);
      if (observableBatch.length > 0) {
        Observable.forkJoin(observableBatch).subscribe(
          () => {
            const fullTranslation = this.getFullTranslationJSON(lang);
            this.logger.debug('Full Translation', fullTranslation);
            if (fullTranslation) {
              observer.next(fullTranslation);
            }
            observer.complete();
          },
          (err: any) => {
            this.logger.error(err);
          });
      } else {
        const fullTranslation = this.getFullTranslationJSON(lang);
        if (fullTranslation) {
          observer.next(fullTranslation);
        }
      }
    });
  }

  init(lang: string) {
    if (this.queue[lang] === undefined) {
      this.queue[lang] = [];
    }
  }

  registerProvider(name: string, path: string) {
    const registered = this.providers.find(provider => provider.name === name);
    if (registered) {
      registered.path = path;
    } else {
      this.providers.push(new NgxTranslateConfig({name: name, path: path}));
    }
  }

  providerRegistered(name: string): boolean {
    return !!this.providers.find(x => x.name === name);
  }

}
