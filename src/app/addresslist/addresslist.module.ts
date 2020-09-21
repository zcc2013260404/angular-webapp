import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddresslistPageRoutingModule } from './addresslist-routing.module';

import { AddresslistPage } from './addresslist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddresslistPageRoutingModule
  ],
  declarations: [AddresslistPage]
})
export class AddresslistPageModule {}
