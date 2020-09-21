import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdertabsPage } from './ordertabs.page';

const routes: Routes = [{
  path: '',
  component: OrdertabsPage,
  children: [
    {
      path: 'orderall',
      data: { "type": "0" },
      loadChildren: () => import('../orderlist/orderlist.module').then(m => m.OrderlistPageModule)
    },
    {
      path: 'orderdf',
      data: { "type": "1" },
      loadChildren: () => import('../orderlist/orderlist.module').then(m => m.OrderlistPageModule)
    },
    {
      path: 'orderdc',
      data: { "type": "2" },
      loadChildren: () => import('../orderlist/orderlist.module').then(m => m.OrderlistPageModule)
    },
    {
      path: 'orderds',
      data: { "type": "3" },
      loadChildren: () => import('../orderlist/orderlist.module').then(m => m.OrderlistPageModule)
    },
    {
      path: 'orderyw',
      data: { "type": "4" },
      loadChildren: () => import('../orderlist/orderlist.module').then(m => m.OrderlistPageModule)
    },
    {
      path: '',
      data: { "type": "0" },
      redirectTo: '/ordertabs/orderall',
      pathMatch: 'full'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdertabsPageRoutingModule { }
