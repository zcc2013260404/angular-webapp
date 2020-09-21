import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabgoodsPage } from './tabgoods.page';

const routes: Routes = [
  {
    path: '',
    component: TabgoodsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabgoodsPageRoutingModule { }
