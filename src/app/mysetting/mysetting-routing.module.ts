import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MysettingPage } from './mysetting.page';

const routes: Routes = [
  {
    path: '',
    component: MysettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MysettingPageRoutingModule {}
