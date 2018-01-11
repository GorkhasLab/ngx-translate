import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NgxTranslateModule} from '../../target';
import {TranslateModule} from '@ngx-translate/core';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.OFF
    }),
    TranslateModule,
    NgxTranslateModule.forRoot({
      name: 'demo', source: '/assets/demo'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
