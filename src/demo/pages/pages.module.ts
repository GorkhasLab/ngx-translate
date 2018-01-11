import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {KickstartComponent} from './kickstart/kickstart.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxTranslateModule} from '../../../target';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    PagesRoutingModule,
    NgxTranslateModule.forRoot({
      name: 'pages', source: '/assets/pages'
    })
  ],
  declarations: [KickstartComponent],
  providers: []
})
export class PagesModule {
}
