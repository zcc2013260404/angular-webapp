import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UseragreementPage } from './useragreement.page';

const routes: Routes = [
  {
    path: '',
    component: UseragreementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UseragreementRoutingModule {}
