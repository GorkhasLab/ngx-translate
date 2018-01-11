import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule, Optional, Provider, SkipSelf} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {NgxTranslateService, TRANSLATION_PROVIDER, TranslationProvider} from './service/ngx-tranlsate.service';
import {LanguageSwitcherComponent} from './components/language-switcher/language-switcher.component';
import {NgxTranslateLoader} from './service/ngx-translate-loader.service';
import {LoggerModule, NGXLogger} from 'ngx-logger';

export function ngxTranslateModuleComponents() {
  return [LanguageSwitcherComponent];
}

export function ngxTranslateModuleProviders(): Provider[] {
  return [
    NgxTranslateLoader,
    NgxTranslateService
  ];
}

export function createNgxTranslateLoader(http: HttpClient, logger: NGXLogger) {
  return new NgxTranslateLoader(http, logger);
}

export function buildNgxTranslationProvider(name: string, source: string): Provider {
  return {
    provide: TRANSLATION_PROVIDER,
    multi: true,
    useValue: {
      name: name,
      source: source
    }
  };
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LoggerModule.forChild(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createNgxTranslateLoader),
        deps: [HttpClient, NGXLogger]
      },
      isolate: true
    })
  ],
  exports: [...ngxTranslateModuleComponents(), TranslateModule],
  declarations: [...ngxTranslateModuleComponents()],
  providers: [...ngxTranslateModuleProviders()]
})
export class NgxTranslateModule {
  private static ngxTranslationService;

  constructor(@Optional() @SkipSelf() parentModule: NgxTranslateModule,
              private ngxTranslationService: NgxTranslateService) {
    // throwIfAlreadyLoaded(parentModule, 'NgxTranslateModule');
    NgxTranslateModule.ngxTranslationService = this.ngxTranslationService;
  }

  static forRoot(config?: TranslationProvider): ModuleWithProviders {
    if (NgxTranslateModule.ngxTranslationService) {
      NgxTranslateModule.ngxTranslationService.addTranslationFolder(config.name, config.source);
    }
    return {
      ngModule: NgxTranslateModule,
      providers: [...ngxTranslateModuleProviders(), buildNgxTranslationProvider(config.name, config.source)]
    };
  }
}

