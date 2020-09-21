import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NameAuthFormPage } from './nameauthform.page';

const routes: Routes = [
  {
    path: '',
    component: NameAuthFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NameAuthFormPageRoutingModule {}
