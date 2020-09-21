import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoodstypePageRoutingModule } from './goodstype-routing.module';

import { GoodstypePage } from './goodstype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoodstypePageRoutingModule
  ],
  declarations: [GoodstypePage]
})
export class GoodstypePageModule {}
