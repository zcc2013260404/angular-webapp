import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NameauthPageRoutingModule } from './nameauth-routing.module';

import { NameauthPage } from './nameauth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NameauthPageRoutingModule
  ],
  declarations: [NameauthPage]
})
export class NameauthPageModule {}
