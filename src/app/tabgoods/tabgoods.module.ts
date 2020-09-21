import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabgoodsPageRoutingModule } from './tabgoods-routing.module';
import { ImglazyloadModule } from '../modules/imglazyload/imglazyload.module';
import { TabgoodsPage } from './tabgoods.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImglazyloadModule,
    TabgoodsPageRoutingModule
  ],
  declarations: [TabgoodsPage]
})
export class TabgoodsPageModule { }
