import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoodstypePage } from './goodstype.page';

const routes: Routes = [
  {
    path: '',
    component: GoodstypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoodstypePageRoutingModule {}
