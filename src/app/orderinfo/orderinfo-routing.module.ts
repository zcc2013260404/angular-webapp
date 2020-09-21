import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderinfoPage } from './orderinfo.page';

const routes: Routes = [
  {
    path: '',
    component: OrderinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderinfoPageRoutingModule {}
