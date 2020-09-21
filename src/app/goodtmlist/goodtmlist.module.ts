import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoodtmlistPageRoutingModule } from './goodtmlist-routing.module';

import { ImglazyloadModule } from '../modules/imglazyload/imglazyload.module';

import { GoodtmlistPage } from './goodtmlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImglazyloadModule,
    GoodtmlistPageRoutingModule
  ],
  declarations: [GoodtmlistPage]
})
export class GoodtmlistPageModule { }
