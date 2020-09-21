import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderlistinfoPage } from './orderlistinfo.page';

const routes: Routes = [
  {
    path: '',
    component: OrderlistinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderlistinfoPageRoutingModule {}
