import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddresseditPageRoutingModule } from './addressedit-routing.module';

import { AddresseditPage } from './addressedit.page';

// import { CityPickerModule } from  "ionic2-city-picker"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddresseditPageRoutingModule,
    // CityPickerModule
  ],
  declarations: [AddresseditPage]
})
export class AddresseditPageModule {}
