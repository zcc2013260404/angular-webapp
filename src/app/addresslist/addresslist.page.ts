import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatusbarService } from '../services/statusbar.service';
import { Router, NavigationExtras } from '@angular/router';
import { CommonService } from '../services/common.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-addresslist',
  templateUrl: './addresslist.page.html',
  styleUrls: ['./addresslist.page.scss'],
})
export class AddresslistPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public userInfo: any;// user info

  public isloading = false;

  public adata = [];

  constructor(
    private statusbarService: StatusbarService,
    public navController: NavController,
    public common: CommonService,
    public store: StorageService,
    private router: Router) {}

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadUserInfo();
    this.loadData();
  }

  goBack() {
    this.navController.back();
  }

  add() {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'type': 0 }
    };
    this.router.navigate(['/addressedit'], navigationExtras);
  }

  edit(aid) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'type': 1, 'aid': aid }
    };
    this.router.navigate(['/addressedit'], navigationExtras);
  }

  loadData() {
    this.isloading = true;
    let uid = this.userInfo.uid;
    if (uid) {
      //时间差
      let timedifflong = 0;
      if (this.userInfo.timedifflong) {
        timedifflong = this.userInfo.timedifflong;
      }
      let stime = new Date().getTime() + timedifflong;
      let sign = this.common.sign({
        'uid': uid,
        'stime': stime,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'sign': sign,
        'stime': stime
      };
      let api_url = this.common.wx_urlList.loadAddress;
      this.common.post(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          this.adata = response.data;
          console.log("dj",this.adata)
        } else {
          this.common.popToastView(response.msg);
        }
        this.isloading = false;
      }).catch(() => {
        this.isloading = false;
        this.common.popToastView('网络异常!');
      });
    }
  }

  loadUserInfo() {
    this.userInfo = this.store.get('userInfo');
  }

}
