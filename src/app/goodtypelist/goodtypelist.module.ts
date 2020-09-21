import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoodtypelistPageRoutingModule } from './goodtypelist-routing.module';

import { GoodtypelistPage } from './goodtypelist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoodtypelistPageRoutingModule
  ],
  declarations: [GoodtypelistPage]
})
export class GoodtypelistPageModule {}
