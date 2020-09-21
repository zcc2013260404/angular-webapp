import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NameAuthFormPageRoutingModule } from './nameauthform-routing.module';

import { NameAuthFormPage } from './nameauthform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NameAuthFormPageRoutingModule
  ],
  declarations: [NameAuthFormPage]
})
export class NameAuthFormPageModule {}
