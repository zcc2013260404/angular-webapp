import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyadvancelivePage } from './myadvancelive.page';

const routes: Routes = [
  {
    path: '',
    component: MyadvancelivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyadvancelivePageRoutingModule {}
