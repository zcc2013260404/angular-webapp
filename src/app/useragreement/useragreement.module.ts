import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UseragreementRoutingModule } from './useragreement-routing.module';

import { UseragreementPage } from './useragreement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UseragreementRoutingModule
  ],
  declarations: [UseragreementPage]
})
export class UseragreementModule {}
