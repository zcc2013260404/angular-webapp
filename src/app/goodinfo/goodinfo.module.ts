import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GoodinfoPageRoutingModule } from './goodinfo-routing.module';
import {ImglazyloadModule} from '../modules/imglazyload/imglazyload.module';
import { GoodinfoPage } from './goodinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImglazyloadModule,
    GoodinfoPageRoutingModule
  ],
  declarations: [GoodinfoPage]
})
export class GoodinfoPageModule {}
