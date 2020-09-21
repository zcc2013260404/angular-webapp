import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewlivePage } from './viewlive.page';

const routes: Routes = [
  {
    path: '',
    component: ViewlivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewlivePageRoutingModule {}
