import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabstorePage } from './tabstore.page';

const routes: Routes = [
  {
    path: '',
    component: TabstorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabstorePageRoutingModule {}
