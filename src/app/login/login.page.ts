import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatusbarService } from '../services/statusbar.service';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { EventService } from '../services/event.service';

declare let window;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public isWaitCode = false;
  public waitSecond = 0;
  public code = '';
  public codeleng = 0;
  public codeText = '获取验证码';

  public phone: any;

  constructor(
    private statusbarService: StatusbarService,
    public common: CommonService,
    public store: StorageService,
    public navController: NavController,
    public eventService: EventService) { }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
  }

  goBack() {
    this.eventService.event.emit('userLogined');
    this.navController.back();
  }

  sendCode() {
    if (!this.isWaitCode) {
      if (/^\d{11}$/.test(this.phone)) {
        this.isWaitCode = true;
        this.waitSecond = 60;
        this.codeText = '60秒';
        this.doTimer();
        let api_url = this.common.wx_urlList.loadLoginCode;


        this.common.post(api_url, {
          'mobile': this.phone
        }).then((response: any) => {
          let code = response.code;
          if (code == 'fail') {
            this.common.popToastView('网络异常!');
          }
        }).catch((e) => {
          console.log("load login code :" + e);
          this.common.popToastView('网络异常!');
        });
      } else {
        this.common.popToastView('请输入正确的数据号码');
      }
    }
  }

  //倒计时
  doTimer() {
    var timer = setInterval(() => {
      this.waitSecond--;
      if (this.waitSecond == 0) {
        clearInterval(timer);
        this.isWaitCode = false;
        this.codeText = '重新获取';
      } else {
        this.isWaitCode = true;
        this.codeText = this.waitSecond + '秒';
      }
    }, 1000);
  }

  change() {
    this.codeleng = (this.code + "").length;
  }

  login() {
    if (this.codeleng >= 4) {
      let api_url = this.common.wx_urlList.loginByPhoneCode;
      this.common.post(api_url, {
        'mobile': this.phone,
        'code': this.code
      }).then((response: any) => {

        console.log("login:  " + JSON.stringify(response))

        let code = response.code;
        if (code == 'success') {
          let uid = response.data.uid;
          let uname = response.data.nickname;
          let avatar = response.data.avatar;
          let salt = response.data.salt;
          this.store.set("userInfo", { "uid": uid, "uname": uname, "uphone": this.phone, 'avatar': avatar, "salt": salt });

          this.getCarInfo(uid,salt);
          this.goBack();
        } else
          if (code == 'fail') {
            this.common.popToastView(response.msg);
          }
      }).catch((e) => {console.log(e);
        this.common.popToastView('网络异常!');
      });
    }
  }

  getCarInfo(uid,salt){
    let timediff = 0;
    //时间差
    let timedifflong = timediff;
    let stime = (new Date().getTime() + timedifflong) + '';
    let sign = this.common.sign({
      'uid': uid,
      'stime': stime,
      'salt': salt//私钥
    });//签名
    let param = {
      'uid': uid,
      'sign': sign,
      'stime': stime
    };
    let api_url = this.common.wx_urlList.loadMyGoodsCarts;
    this.common.post(api_url, param).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        let rdata = response.data;
        if (rdata) {
          let gdata = rdata.merch_list;
          if (gdata) {
            this.store.set("carInfo", gdata);
        }else {
            this.store.set("carInfo", []);
          }
      } else {
          this.common.popToastView('获取购物车信息异常!');
        }
      }
    }).catch((e) => {
      this.common.popToastView('获取购物车信息异常!');
    });
  }


  wxLogin() {
    let scope = "snsapi_userinfo",
      state = "_" + (+new Date());
    let cthis = this;
    window.Wechat.auth(scope, state, function(response) {
      // tslint:disable-next-line:max-line-length
      // "051OMYZv3EoTPU27Li1w3UGpff1OMYZp
      console.log('wechat.auth:     ' + JSON.stringify(response));
      let api_url = cthis.common.wx_urlList.wxLogin;
      var param = {
        'code': response.code
      };
      cthis.common.post(api_url, param).then((response: any) => {
        console.log('common.ajaxPost:     ' + JSON.stringify(response));
        let code = response.code;
        if (code == 'success') {
          let uid = response.data.uid;
          let uname = response.data.nickname;
          let avatar = response.data.avatar;
          let salt = response.data.salt;
          let phone = response.data.mobile;
          cthis.store.set('userInfo', { "uid": uid, "uname": uname, "uphone": phone, 'avatar': avatar, "salt": salt });
          cthis.goBack();
        } else
            // tslint:disable-next-line:triple-equals
        if (code == 'fail') {
          cthis.common.popToastView(response.msg);
        }
      }).catch((e) => {
        console.log(e);
        cthis.common.popToastView('网络异常!');
      });
      // tslint:disable-next-line:only-arrow-functions
    }, function(reason) {
      alert('Failed: ' + reason);
    });
  }
}
