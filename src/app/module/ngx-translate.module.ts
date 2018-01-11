import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {NgxTranslateService, TRANSLATION_PROVIDER} from './service/ngx-tranlsate.service';
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
    LoggerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createNgxTranslateLoader),
        deps: [HttpClient, NGXLogger]
      },
      isolate: true
    })
  ],
  exports: [...ngxTranslateModuleComponents()],
  declarations: [...ngxTranslateModuleComponents()]
})
export class NgxTranslateModule {
  static forRoot(config?: any): ModuleWithProviders {
    return {
      ngModule: NgxTranslateModule,
      providers: [
        ...ngxTranslateModuleProviders()
      ]
    };
  }
}

