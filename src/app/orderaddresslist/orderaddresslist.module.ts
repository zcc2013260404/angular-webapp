import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderAddresslistPageRoutingModule } from './orderaddresslist-routing.module';

import { OrderAddresslistPage } from './orderaddresslist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderAddresslistPageRoutingModule
  ],
  declarations: [OrderAddresslistPage]
})
export class OrderAddresslistPageModule {}
