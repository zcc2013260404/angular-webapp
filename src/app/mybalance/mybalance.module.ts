import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MybalancePageRoutingModule } from './mybalance-routing.module';

import { MybalancePage } from './mybalance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MybalancePageRoutingModule
  ],
  declarations: [MybalancePage]
})
export class MybalancePageModule {}
