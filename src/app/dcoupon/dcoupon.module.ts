import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DcouponPageRoutingModule } from './dcoupon-routing.module';

import { DcouponPage } from './dcoupon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DcouponPageRoutingModule
  ],
  declarations: [DcouponPage]
})
export class DcouponPageModule {}
