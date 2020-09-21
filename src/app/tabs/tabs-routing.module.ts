import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tabgoods',
        loadChildren: () => import('../tabgoods/tabgoods.module').then(m => m.TabgoodsPageModule)
      },
      {
        path: 'tablive',
        loadChildren: () => import('../tablive/tablive.module').then(m => m.TablivePageModule)
      }, {
        path: 'tabzc',
        loadChildren: () => import('../tabzc/tabzc.module').then(m => m.TabzcPageModule)
      },
      {
        path: 'tabstore',
        loadChildren: () => import('../tabstore/tabstore.module').then(m => m.TabstorePageModule)
      },
      {
        path: 'tabme',
        loadChildren: () => import('../tabme/tabme.module').then(m => m.TabmePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tabgoods',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabgoods',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
