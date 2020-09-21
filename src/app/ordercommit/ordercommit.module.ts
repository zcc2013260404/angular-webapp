import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdercommitPageRoutingModule } from './ordercommit-routing.module';

import { OrdercommitPage } from './ordercommit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdercommitPageRoutingModule
  ],
  declarations: [OrdercommitPage]
})
export class OrdercommitPageModule {}
