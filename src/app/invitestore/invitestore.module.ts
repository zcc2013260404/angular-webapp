import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitestorePageRoutingModule } from './invitestore-routing.module';

import { InvitestorePage } from './invitestore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitestorePageRoutingModule
  ],
  declarations: [InvitestorePage]
})
export class InvitestorePageModule {}
