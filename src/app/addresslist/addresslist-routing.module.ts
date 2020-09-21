import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddresslistPage } from './addresslist.page';

const routes: Routes = [
  {
    path: '',
    component: AddresslistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddresslistPageRoutingModule {}
