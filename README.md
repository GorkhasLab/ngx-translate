<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/GorkhasLab/gorkhas-ngx-translate/master/demo/src/assets/logo.svg">
</p>

# gorkhas-ngx-translate - Ngx Translate

[![npm version](https://badge.fury.io/js/gorkhas-ngx-translate.svg)](https://badge.fury.io/js/gorkhas-ngx-translate),
[![Build Status](https://travis-ci.org/GorkhasLab/gorkhas-ngx-translate.svg?branch=master)](https://travis-ci.org/GorkhasLab/gorkhas-ngx-translate)
[![Coverage Status](https://coveralls.io/repos/github/GorkhasLab/gorkhas-ngx-translate/badge.svg?branch=master)](https://coveralls.io/github/GorkhasLab/gorkhas-ngx-translate?branch=master)
[![dependency Status](https://david-dm.org/GorkhasLab/gorkhas-ngx-translate/status.svg)](https://david-dm.org/GorkhasLab/gorkhas-ngx-translate)
[![devDependency Status](https://david-dm.org/GorkhasLab/gorkhas-ngx-translate/dev-status.svg?branch=master)](https://david-dm.org/GorkhasLab/gorkhas-ngx-translate#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/GorkhasLab/gorkhas-ngx-translate.svg)](https://greenkeeper.io/)

## Demo

View all the directives in action at https://GorkhasLab.github.io/ngx-translate

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `gorkhas-gorkhas-ngx-translate` via:
```shell
npm install --save gorkhas-ngx-translate
```

Once installed you need to import the main module:
```js
import { NgxTranslateModule } from 'gorkhas-ngx-translate';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice `NgxTranslateModule.forRoot()`):
```js
import { NgxTranslateModule } from 'gorkhas-ngx-translate';
import {TranslateModule} from '@ngx-translate/core';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [
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
    , ...
  ],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

In this case i18n json must be placed inside 
```yml
assets
  +demo/
    +i18n/
      - en.json
      - np.json
```

Other modules in your application can simply import ` LibModule `:

```js
import { NgxTranslateModule } from 'gorkhas-ngx-translate';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [
        TranslateModule,
        NgxTranslateModule.forRoot({
          name: 'pages', source: '/assets/pages'
        })
    , ...], 
})
export class OtherModule {
}
```
In this case i18n json must be placed inside 
```yml
assets/
  +pages/
    +i18n/
      - en.json
      - np.json
```

## Usage
More detail https://github.com/GorkhasLab/ngx-translate/tree/master/src/demo


## License

Copyright (c) 2018 Bhuwan Upadhyay. Licensed under the MIT License (MIT)

