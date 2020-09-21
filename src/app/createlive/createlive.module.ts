import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatelivePageRoutingModule } from './createlive-routing.module';

import { CreatelivePage } from './createlive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatelivePageRoutingModule
  ],
  declarations: [CreatelivePage]
})
export class CreatelivePageModule {}
