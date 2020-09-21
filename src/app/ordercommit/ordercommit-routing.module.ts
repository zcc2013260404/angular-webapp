import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdercommitPage } from './ordercommit.page';

const routes: Routes = [
  {
    path: '',
    component: OrdercommitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdercommitPageRoutingModule {}
