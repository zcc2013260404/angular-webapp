import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-tabme',
  templateUrl: './tabme.page.html',
  styleUrls: ['./tabme.page.scss'],
})
export class TabmePage implements OnInit {

  public isloading = false;

  public userInfo: any; // user info
  public isLogined = false; // 是否登录
  public udata: any = {}; // 用户登录信息
  public timediff = 0;

  constructor(
    public common: CommonService,
    public store: StorageService,
    public navController: NavController,
    public eventService: EventService) {
  }

  ngOnInit() {
    this.eventService.event.on('userLogined', () => {
      this.loadUserInfo();
      if (this.userInfo) {
        this.isLogined = true;
        this.getLoginedData();
      } else {
        this.isLogined = false;
      }
    });
  }

  ionViewWillEnter() {
    this.loadUserInfo();
    if (this.userInfo) {
      this.isLogined = true;
      this.getLoginedData();
    } else {
      this.isLogined = false;
    }
  }

  // 获取登录成功后信息
  getLoginedData() {
    this.isloading = true;
    const uid = this.userInfo.uid;
    if (uid) {
      // 时间差
      const timedifflong = this.timediff;
      const stime = new Date().getTime() + timedifflong;
      const sign = this.common.sign({
        uid: uid,
        stime: stime,
        salt: this.userInfo.salt// 私钥
      }); // 签名
      const param = {
        uid: uid,
        sign: sign,
        stime: stime
      }; console.log(param);
      const api_url = this.common.wx_urlList.loadMyInfo;
      this.common.post(api_url, param).then((response: any) => {
        const code = response.code; console.log(response);
        if (code == 'success') {
          const data = response.data;
          // tslint:disable-next-line:max-line-length
          this.store.set('meInfo', { fcount: data.fcount, scount: data.scount, rcount: data.rcount, bcount: data.bcount, sid: data.sid, sname: data.sname, esum: data.esum });
          this.udata = response.data;
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
  loadTimediff() {
    this.timediff = this.common.changeStr(this.store.get('timedifflong'), '0');
  }

  // 消息中心
  goMessage() {
    this.navController.navigateForward('/message');
  }
  // 登录
  goLogin() {
    this.navController.navigateForward('/login', {
      queryParams: {
        returnUrl: '/tabs/tabme'
      }
    });
  }
  // 我的订单
  goOrder() {
    if (this.isLogined) {
      this.navController.navigateForward('/ordertabs');
    } else {
      this.goLogin();
    }
  }
  // 特币
  goTecoin() {
    if (this.isLogined) {
      this.navController.navigateForward('/tecoin');
    } else {
      this.goLogin();
    }
  }
  // 优惠卷
  goDcoupon() {
    if (this.isLogined) {
      this.navController.navigateForward('/dcoupon');
    } else {
      this.goLogin();
    }
  }
  // 收货地址
  goAddress() {
    if (this.isLogined) {
      this.navController.navigateForward('/addresslist');
    } else {
      this.goLogin();
    }
  }
  // 实名认证
  goNameauth() {
    if (this.isLogined) {
      this.navController.navigateForward('/nameauth');
    } else {
      this.goLogin();
    }
  }
  // 邀请店铺
  goInvite() {
    if (this.isLogined) {
      this.navController.navigateForward('/invitestore');
    } else {
      this.goLogin();
    }
  }
  // 我的直播
  goMyLive() {
    if (this.isLogined) {
      this.navController.navigateForward('/mylive');
    } else {
      this.goLogin();
    }
  }
  // 我的预告
  goAdvanceLive() {
    if (this.isLogined) {
      this.navController.navigateForward('/myadvancelive');
    } else {
      this.goLogin();
    }
  }
  // 创建直播
  goCreateLive() {
    // if (this.isLogined) {
    this.navController.navigateForward('/createlive');
    // } else {
    //   this.goLogin();
    // }
  }
  // 我的余额
  goMybalance() {
    if (this.isLogined) {
      this.navController.navigateForward('/mybalance');
    } else {
      this.goLogin();
    }
  }
  // 设置
  goSetting() {
    if (this.isLogined) {
      this.navController.navigateForward('/mysetting');
    } else {
      this.goLogin();
    }
  }
}
