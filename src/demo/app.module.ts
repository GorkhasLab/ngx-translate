import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {buildNgxTranslationProvider, NgxTranslateModule, NgxTranslateService} from '../app/public_api';
import {TranslateModule} from '@ngx-translate/core';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.OFF
    }),
    NgxTranslateModule.forRoot({})
  ],
  providers: [
    buildNgxTranslationProvider('demo', 'assets/demo/')
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private ngxTranslateService: NgxTranslateService) {
    this.ngxTranslateService.useLang('en');
  }
}
