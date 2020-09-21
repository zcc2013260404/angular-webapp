import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderinfoPageRoutingModule } from './orderinfo-routing.module';

import { OrderinfoPage } from './orderinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderinfoPageRoutingModule
  ],
  declarations: [OrderinfoPage]
})
export class OrderinfoPageModule {}
