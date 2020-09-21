import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MylivePageRoutingModule } from './mylive-routing.module';

import { MylivePage } from './mylive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MylivePageRoutingModule
  ],
  declarations: [MylivePage]
})
export class MylivePageModule {}
