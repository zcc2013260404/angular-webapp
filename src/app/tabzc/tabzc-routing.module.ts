import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabzcPage } from './tabzc.page';

const routes: Routes = [
  {
    path: '',
    component: TabzcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabzcPageRoutingModule {}
