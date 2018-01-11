import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KickstartComponent} from './kickstart/kickstart.component';

const routes: Routes = [
  {
    path: 'kickstart',
    component: KickstartComponent
  },
  {path: '', redirectTo: 'kickstart', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
