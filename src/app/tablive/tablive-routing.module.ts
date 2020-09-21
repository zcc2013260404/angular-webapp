import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablivePage } from './tablive.page';

const routes: Routes = [
  {
    path: '',
    component: TablivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablivePageRoutingModule {}
