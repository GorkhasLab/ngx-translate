<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/GorkhasLab/ngx-translate/master/demo/src/assets/logo.svg">
</p>

# ngx-translate - Ngx Translate

[![npm version](https://badge.fury.io/js/ngx-translate.svg)](https://badge.fury.io/js/ngx-translate),
[![Build Status](https://travis-ci.org/GorkhasLab/ngx-translate.svg?branch=master)](https://travis-ci.org/GorkhasLab/ngx-translate)
[![Coverage Status](https://coveralls.io/repos/github/GorkhasLab/ngx-translate/badge.svg?branch=master)](https://coveralls.io/github/GorkhasLab/ngx-translate?branch=master)
[![dependency Status](https://david-dm.org/GorkhasLab/ngx-translate/status.svg)](https://david-dm.org/GorkhasLab/ngx-translate)
[![devDependency Status](https://david-dm.org/GorkhasLab/ngx-translate/dev-status.svg?branch=master)](https://david-dm.org/GorkhasLab/ngx-translate#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/GorkhasLab/ngx-translate.svg)](https://greenkeeper.io/)

## Demo

View all the directives in action at https://GorkhasLab.github.io/ngx-translate

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `ngx-translate` via:
```shell
npm install --save ngx-translate
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ngx-translate`:
```js
map: {
  'ngx-translate': 'node_modules/ngx-translate/bundles/ngx-translate.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { LibModule } from 'ngx-translate';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` LibModule .forRoot()`):
```js
import { LibModule } from 'ngx-translate';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [LibModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` LibModule `:

```js
import { LibModule } from 'ngx-translate';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [LibModule, ...], 
})
export class OtherModule {
}
```

## Usage



## License

Copyright (c) 2018 Bhuwan Upadhyay. Licensed under the MIT License (MIT)

