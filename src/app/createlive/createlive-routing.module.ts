import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatelivePage } from './createlive.page';

const routes: Routes = [
  {
    path: '',
    component: CreatelivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatelivePageRoutingModule {}
