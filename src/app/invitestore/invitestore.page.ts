import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service';
import { StatusbarService } from '../services/statusbar.service';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-invitestore',
  templateUrl: './invitestore.page.html',
  styleUrls: ['./invitestore.page.scss'],
})
export class InvitestorePage implements OnInit {

  public headerBarPaddingTop = '0px';

  public isloading = false;

  public loading = null;

  public userInfo: any;// user info

  public shopname: any;

  public code: any;//邀请码
  public codeleng = 0;//邀请码长度
  constructor(
    private statusbarService: StatusbarService,
    public store: StorageService,
    public navController: NavController,
    public common: CommonService) { }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadUserInfo();
    this.loadData();
  }


  change() {
    this.codeleng = (this.code + "").length;
  }

  goBack() {
    this.navController.back();
  }

  changeZb() {
    if (this.codeleng>3){
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
          'invite_code': this.code,
          'salt': this.userInfo.salt//私钥
        });//签名
        let param = {
          'uid': uid,
          'sign': sign,
          'invite_code': this.code,
          'stime': stime
        };
        let api_url = this.common.wx_urlList.bindInvitationShop;
        this.common.ajaxPost(api_url, param).then((response: any) => {
          let code = response.code;
          if (code == 'success') {
            let data = response.data;
            console.log(response);
            this.shopname = data.merchname;
            this.common.popToastView("绑定成功");
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
          this.shopname = data.merchname;
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
