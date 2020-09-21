import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MysettingPageRoutingModule } from './mysetting-routing.module';

import { MysettingPage } from './mysetting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MysettingPageRoutingModule
  ],
  declarations: [MysettingPage]
})
export class MysettingPageModule {}
