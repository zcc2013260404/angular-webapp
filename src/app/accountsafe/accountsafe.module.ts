import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountsafePageRoutingModule } from './accountsafe-routing.module';

import { AccountsafePage } from './accountsafe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountsafePageRoutingModule
  ],
  declarations: [AccountsafePage]
})
export class AccountsafePageModule {}
