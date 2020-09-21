import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MybalancePage } from './mybalance.page';

const routes: Routes = [
  {
    path: '',
    component: MybalancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MybalancePageRoutingModule {}
