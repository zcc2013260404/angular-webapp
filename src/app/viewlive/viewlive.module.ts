import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewlivePageRoutingModule } from './viewlive-routing.module';
import { ImglazyloadModule } from '../modules/imglazyload/imglazyload.module';
import { ViewlivePage } from './viewlive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImglazyloadModule,
    ViewlivePageRoutingModule
  ],
  declarations: [ViewlivePage]
})
export class ViewlivePageModule {}
