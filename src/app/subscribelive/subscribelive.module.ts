import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscribelivePageRoutingModule } from './subscribelive-routing.module';

import { SubscribelivePage } from './subscribelive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscribelivePageRoutingModule
  ],
  declarations: [SubscribelivePage]
})
export class SubscribelivePageModule {}
