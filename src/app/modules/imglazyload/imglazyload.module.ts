import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ImglazyloadComponent } from '../../components/imglazyload/imglazyload.component';


@NgModule({
  declarations: [ImglazyloadComponent],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule
  ],
  exports: [ImglazyloadComponent]
})
export class ImglazyloadModule { }
