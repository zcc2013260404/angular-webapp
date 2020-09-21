import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderlistinfoPageRoutingModule } from './orderlistinfo-routing.module';

import { OrderlistinfoPage } from './orderlistinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderlistinfoPageRoutingModule
  ],
  declarations: [OrderlistinfoPage]
})
export class OrderlistinfoPageModule {}
