import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoodtmlistPage } from './goodtmlist.page';

const routes: Routes = [
  {
    path: '',
    component: GoodtmlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoodtmlistPageRoutingModule {}
