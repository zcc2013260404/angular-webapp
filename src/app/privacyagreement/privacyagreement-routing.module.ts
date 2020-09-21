import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyagreementPage } from './privacyagreement.page';

const routes: Routes = [
  {
    path: '',
    component: PrivacyagreementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacyagreementRoutingModule {}
