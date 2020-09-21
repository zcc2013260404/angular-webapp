import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MylivePage } from './mylive.page';

const routes: Routes = [
  {
    path: '',
    component: MylivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MylivePageRoutingModule {}
