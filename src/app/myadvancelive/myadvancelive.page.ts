import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { StatusbarService } from '../services/statusbar.service';
import {CommonService} from '../services/common.service';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-myadvancelive',
  templateUrl: './myadvancelive.page.html',
  styleUrls: ['./myadvancelive.page.scss'],
})
export class MyadvancelivePage implements OnInit {

  public headerBarPaddingTop = '0px';
  public userInfo: any;
  public liveList = [];
  public isloading = false;

  public adata = [];

  constructor(

      private statusbarService: StatusbarService,
      public navController: NavController,
      public common: CommonService,
      public store: StorageService,
      private router: Router) { }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadUserInfo();
    this.loadData();
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
        'page':1,
        'stime': stime,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'sign': sign,
        'page':1,
        'stime': stime
      };
      let api_url = this.common.wx_urlList.getLiveAdvice;
      this.common.post(api_url, param).then((response: any) => {

        console.log(">>>>"+JSON.stringify(response));

        let code = response.code;
        if (code == 'success') {
          this.adata = response.data;
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
  goBack() {
    this.navController.back();
  }

}
