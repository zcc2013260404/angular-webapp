import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutusRoutingModule } from './aboutus-routing.module';

import { AboutusPage } from './aboutus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutusRoutingModule
  ],
  declarations: [AboutusPage]
})
export class AboutusModule {}
