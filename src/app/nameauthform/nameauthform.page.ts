import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-nameauthform',
  templateUrl: './nameauthform.page.html',
  styleUrls: ['./nameauthform.page.scss']
})
export class NameAuthFormPage implements OnInit {

  public isloading = false;

  public loading = null;

  public userInfo: any;// user info

  public aid = '';

  public type = 0;

  public adata = {
    'aid': '',
    'realname': '',
    'idnumber': '',
  };

  constructor(public common: CommonService,
    public store: StorageService,
    public navController: NavController,
    public loadingController: LoadingController,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUserInfo();
    this.loadData();

  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: '加载中...',
    });
    await this.loading.present();
  }

  goBack() {
    this.navController.back();
  }

  save() {
    this.navController.back();
    this.presentLoading();
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
        'realname': this.adata.realname,
        'idnumber': this.adata.idnumber,
        'stime': stime,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'realname': this.adata.realname,
        'idnumber': this.adata.idnumber,
        'stime': stime,
        'sign': sign
      };
      let api_url = this.common.wx_urlList.addNameAuth;
      this.common.post(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          this.goBack();
        } else {
          this.common.popToastView(response.msg);
        }
        setTimeout(() => {
          if (this.loading) {
            this.loading.dismiss();
          }
        }, 400);
      }).catch(() => {
        this.isloading = false;
        this.common.popToastView('网络异常!');
      });
    }
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
