import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TecoinPageRoutingModule } from './tecoin-routing.module';

import { TecoinPage } from './tecoin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TecoinPageRoutingModule
  ],
  declarations: [TecoinPage]
})
export class TecoinPageModule {}
