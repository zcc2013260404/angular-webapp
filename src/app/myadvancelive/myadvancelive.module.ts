import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyadvancelivePageRoutingModule } from './myadvancelive-routing.module';

import { MyadvancelivePage } from './myadvancelive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyadvancelivePageRoutingModule
  ],
  declarations: [MyadvancelivePage]
})
export class MyadvancelivePageModule {}
