import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderAddresslistPage } from './orderaddresslist.page';

const routes: Routes = [
  {
    path: '',
    component: OrderAddresslistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderAddresslistPageRoutingModule {}
