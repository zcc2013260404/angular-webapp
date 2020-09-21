import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NameauthPage } from './nameauth.page';

const routes: Routes = [
  {
    path: '',
    component: NameauthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NameauthPageRoutingModule {}
