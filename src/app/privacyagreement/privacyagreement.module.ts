import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacyagreementRoutingModule } from './privacyagreement-routing.module';

import { PrivacyagreementPage } from './privacyagreement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacyagreementRoutingModule
  ],
  declarations: [PrivacyagreementPage]
})
export class PrivacyagreementModule {}
