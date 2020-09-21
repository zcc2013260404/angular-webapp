import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TecoinPage } from './tecoin.page';

const routes: Routes = [
  {
    path: '',
    component: TecoinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TecoinPageRoutingModule {}
