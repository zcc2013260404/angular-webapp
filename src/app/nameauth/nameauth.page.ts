import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import {CommonService} from "../services/common.service";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-nameauth',
  templateUrl: './nameauth.page.html',
  styleUrls: ['./nameauth.page.scss'],
})
export class NameauthPage implements OnInit {

  public isloading = false;
  public headerBarPaddingTop = '30px';
  public loading = null;

  public userInfo: any;// user info

  public aid = '';

  public isNameauth = false;

  public adata = {
    'aid': '',
    'realname': '王大治',
    'idnumber': '362527199406182526',
  };

  constructor(public navController: NavController,
              public store: StorageService,
              public common: CommonService,
              private router: Router) { }


  ngOnInit() {
    this.loadUserInfo();
    this.loadData();
  }

  goBack() {
    this.navController.back();
  }

  goAuth() {
    this.router.navigate(['/nameauthform']);
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
      let api_url = this.common.wx_urlList.getNameAuth;
      this.common.ajaxPost(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          let data = response.data;
          this.adata.realname = data.realname;
          this.adata.idnumber = data.idnumber;
          this.adata = response.data;
          this.isNameauth = true;
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
