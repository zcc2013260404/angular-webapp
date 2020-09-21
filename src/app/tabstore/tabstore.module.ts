import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImglazyloadModule } from '../modules/imglazyload/imglazyload.module';
import { TabstorePageRoutingModule } from './tabstore-routing.module';
import { TabstorePage } from './tabstore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImglazyloadModule,
    TabstorePageRoutingModule
  ],
  declarations: [TabstorePage]
})
export class TabstorePageModule { }
