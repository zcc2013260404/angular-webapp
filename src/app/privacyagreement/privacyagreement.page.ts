import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service';
import { StatusbarService } from '../services/statusbar.service';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-invitestore',
  templateUrl: './privacyagreement.page.html',
  styleUrls: ['./privacyagreement.page.scss'],
})
export class PrivacyagreementPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public isloading = false;

  public loading = null;

  public userInfo: any;// user info

  public info="<h1>dfsafsdfsdfds</h1>";
  constructor(
    private statusbarService: StatusbarService,
    public store: StorageService,
    public navController: NavController,
    public common: CommonService) { }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadUserInfo();
    // this.loadData();
  }

  goBack() {
    this.navController.back();
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
      let api_url = this.common.wx_urlList.getInvitationShop;
      this.common.ajaxPost(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          let data = response.data;
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
