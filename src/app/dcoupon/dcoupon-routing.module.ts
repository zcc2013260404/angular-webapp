import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DcouponPage } from './dcoupon.page';

const routes: Routes = [
  {
    path: '',
    component: DcouponPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DcouponPageRoutingModule {}
