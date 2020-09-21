import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImglazyloadModule } from '../modules/imglazyload/imglazyload.module';
import { StartlivePageRoutingModule } from './startlive-routing.module';
import { StartlivePage } from './startlive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImglazyloadModule,
    StartlivePageRoutingModule
  ],
  declarations: [StartlivePage]
})
export class StartlivePageModule { }
