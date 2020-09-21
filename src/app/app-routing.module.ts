import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },{
    path: 'goodstype',
    loadChildren: () => import('./goodstype/goodstype.module').then(m => m.GoodstypePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'shoppingcart',
    loadChildren: () => import('./shoppingcart/shoppingcart.module').then( m => m.ShoppingcartPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'ordertabs',
    loadChildren: () => import('./ordertabs/ordertabs.module').then( m => m.OrdertabsPageModule)
  },
  {
    path: 'orderlist',
    loadChildren: () => import('./orderlist/orderlist.module').then( m => m.OrderlistPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'tecoin',
    loadChildren: () => import('./tecoin/tecoin.module').then( m => m.TecoinPageModule)
  },
  {
    path: 'dcoupon',
    loadChildren: () => import('./dcoupon/dcoupon.module').then( m => m.DcouponPageModule)
  },
  {
    path: 'mybalance',
    loadChildren: () => import('./mybalance/mybalance.module').then( m => m.MybalancePageModule)
  },
  {
    path: 'nameauth',
    loadChildren: () => import('./nameauth/nameauth.module').then( m => m.NameauthPageModule)
  },
  {
    path: 'invitestore',
    loadChildren: () => import('./invitestore/invitestore.module').then( m => m.InvitestorePageModule)
  },
  {
    path: 'addresslist',
    loadChildren: () => import('./addresslist/addresslist.module').then( m => m.AddresslistPageModule)
  },
  {
    path: 'addressedit',
    loadChildren: () => import('./addressedit/addressedit.module').then( m => m.AddresseditPageModule)
  },
  {
    path: 'goodinfo',
    loadChildren: () => import('./goodinfo/goodinfo.module').then( m => m.GoodinfoPageModule)
  },
  {
    path: 'orderinfo',
    loadChildren: () => import('./orderinfo/orderinfo.module').then( m => m.OrderinfoPageModule)
  },
  {
    path: 'goodtypelist',
    loadChildren: () => import('./goodtypelist/goodtypelist.module').then( m => m.GoodtypelistPageModule)
  },
  {
    path: 'addgoods',
    loadChildren: () => import('./addgoods/addgoods.module').then( m => m.AddgoodsPageModule)
  },
  {
    path: 'ordercommit',
    loadChildren: () => import('./ordercommit/ordercommit.module').then( m => m.OrdercommitPageModule)
  },
  {
    path: 'startlive',
    loadChildren: () => import('./startlive/startlive.module').then( m => m.StartlivePageModule)
  },
  {
    path: 'personaldata',
    loadChildren: () => import('./personaldata/personaldata.module').then( m => m.PersonaldataPageModule)
  },
  {
    path: 'mysetting',
    loadChildren: () => import('./mysetting/mysetting.module').then( m => m.MysettingPageModule)
  },
  {
    path: 'subscribelive',
    loadChildren: () => import('./subscribelive/subscribelive.module').then( m => m.SubscribelivePageModule)
  },
  {
    path: 'logistics',
    loadChildren: () => import('./logistics/logistics.module').then( m => m.LogisticsPageModule)
  },
  {
    path: 'accountsafe',
    loadChildren: () => import('./accountsafe/accountsafe.module').then( m => m.AccountsafePageModule)
  },
  {
    path: 'mylive',
    loadChildren: () => import('./mylive/mylive.module').then( m => m.MylivePageModule)
  },
  {
    path: 'myadvancelive',
    loadChildren: () => import('./myadvancelive/myadvancelive.module').then( m => m.MyadvancelivePageModule)
  },
  {
    path: 'createlive',
    loadChildren: () => import('./createlive/createlive.module').then( m => m.CreatelivePageModule)
  },
  {
    path: 'viewlive',
    loadChildren: () => import('./viewlive/viewlive.module').then( m => m.ViewlivePageModule)
  },
  {
    path: 'goodtmlist',
    loadChildren: () => import('./goodtmlist/goodtmlist.module').then( m => m.GoodtmlistPageModule)
  },  {
    path: 'orderaddresslist',
    loadChildren: () => import('./orderaddresslist/orderaddresslist.module').then( m => m.OrderAddresslistPageModule)
  },
  {
    path: 'orderlistinfo',
    loadChildren: () => import('./orderlistinfo/orderlistinfo.module').then( m => m.OrderlistinfoPageModule)
  },
  {
    path: 'nameauthform',
    loadChildren: () => import('./nameauthform/nameauthform.module').then( m => m.NameAuthFormPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./aboutus/aboutus.module').then( m => m.AboutusModule)
  },
  {
    path: 'useragreement',
    loadChildren: () => import('./useragreement/useragreement.module').then( m => m.UseragreementModule)
  },
  {
    path: 'privacyagreement',
    loadChildren: () => import('./privacyagreement/privacyagreement.module').then( m => m.PrivacyagreementModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
