import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddgoodsPageRoutingModule } from './addgoods-routing.module';

import { AddgoodsPage } from './addgoods.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddgoodsPageRoutingModule
  ],
  declarations: [AddgoodsPage]
})
export class AddgoodsPageModule {}
