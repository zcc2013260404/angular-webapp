import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonaldataPageRoutingModule } from './personaldata-routing.module';

import { PersonaldataPage } from './personaldata.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonaldataPageRoutingModule
  ],
  declarations: [PersonaldataPage]
})
export class PersonaldataPageModule {}
