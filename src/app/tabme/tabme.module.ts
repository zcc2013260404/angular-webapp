import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabmePageRoutingModule } from './tabme-routing.module';

import { TabmePage } from './tabme.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabmePageRoutingModule
  ],
  declarations: [TabmePage]
})
export class TabmePageModule {}
