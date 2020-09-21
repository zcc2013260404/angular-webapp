import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TablivePageRoutingModule } from './tablive-routing.module';
import {ImglazyloadModule} from '../modules/imglazyload/imglazyload.module';
import { TablivePage } from './tablive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImglazyloadModule,
    TablivePageRoutingModule
  ],
  declarations: [TablivePage]
})
export class TablivePageModule { }
