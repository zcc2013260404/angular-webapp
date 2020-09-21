import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdertabsPageRoutingModule } from './ordertabs-routing.module';

import { OrdertabsPage } from './ordertabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdertabsPageRoutingModule
  ],
  declarations: [OrdertabsPage]
})
export class OrdertabsPageModule {}
