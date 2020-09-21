import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonaldataPage } from './personaldata.page';

const routes: Routes = [
  {
    path: '',
    component: PersonaldataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonaldataPageRoutingModule {}
