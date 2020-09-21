import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabzcPageRoutingModule } from './tabzc-routing.module';

import { TabzcPage } from './tabzc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabzcPageRoutingModule
  ],
  declarations: [TabzcPage]
})
export class TabzcPageModule {}
