import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddresseditPage } from './addressedit.page';

const routes: Routes = [
  {
    path: '',
    component: AddresseditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddresseditPageRoutingModule {}
