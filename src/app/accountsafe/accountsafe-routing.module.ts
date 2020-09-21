import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountsafePage } from './accountsafe.page';

const routes: Routes = [
  {
    path: '',
    component: AccountsafePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsafePageRoutingModule {}
