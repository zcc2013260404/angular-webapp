import { Component, OnInit } from '@angular/core';
import { StatusbarService } from '../services/statusbar.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';

declare let cordova;
declare let Wechat: any;
@Component({
  selector: 'app-orderinfo',
  templateUrl: './orderinfo.page.html',
  styleUrls: ['./orderinfo.page.scss'],
  animations: [
    trigger('showChooseType', [
      state('up', style({
        bottom: '0rem'
      })),
      state('down', style({
        bottom: '-23rem'
      })),
      transition('up => down', [animate('0.3s')]),
      transition('down => up', [animate('0.3s')])
    ]),
  ]
})
export class OrderinfoPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public isloading = false;

  public userInfo: any;// user info
  public oid = '';//order id
  public orderData = {
    aid: "",
    ctime: "",
    ftime: "",
    emv: "",
    fmv: "",
    glist: [],
    hmv: 0,
    jmv: 0,
    oid: '',
    paddress: '',
    pname: '',
    pphone: '',
    ssecond: 0,
    tmv: 0,
    type: 0,
    ymv: 0,
    zmv: 0
  };//订单数据
  public dftxt = '';//待付剩余时间//还剩05分23秒自动关闭
  public ssecond = 0;//剩余关闭时间

  public loading = null;

  public showBuy = false;
  public wxCheck = true;
  public zfbCheck = false;


  constructor(
    private statusbarService: StatusbarService,
    public store: StorageService,
    public common: CommonService,
    public navController: NavController,
    public loadingController: LoadingController,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.route.queryParams.subscribe((data) => {
      this.oid = data.oid;
    });
    this.loadUserInfo();
    this.loadData();
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: '加载中...',
    });
    await this.loading.present();
  }

  loadUserInfo() {
    this.userInfo = this.store.get('userInfo');
  }

  //load order info
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
        'oid': this.oid,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'sign': sign,
        'stime': stime,
        'oid': this.oid
      };
      let api_url = this.common.urlList.loadOrderInfo;
      this.common.ajaxPost(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          let data = response.data;
          this.orderData.aid = this.common.changeStr(data.aid, '');
          this.orderData.ctime = this.common.changeStr(data.ctime, '');
          this.orderData.ftime = this.common.changeStr(data.ftime, '');
          this.orderData.emv = this.common.changeStr(data.emv, '');
          this.orderData.fmv = this.common.changeStr(data.fmv, '');
          this.orderData.glist = this.common.changeStr(data.glist, []);
          this.orderData.hmv = this.common.changeStr(data.hmv, 0);
          this.orderData.jmv = this.common.changeStr(data.jmv, 0);
          this.orderData.oid = this.common.changeStr(data.oid, '');
          this.orderData.paddress = this.common.changeStr(data.paddress, '');
          this.orderData.pname = this.common.changeStr(data.pname, '');
          this.orderData.pphone = this.common.changeStr(data.pphone, '');
          this.orderData.ssecond = this.common.changeStr(data.ssecond, 0);
          this.orderData.tmv = this.common.changeStr(data.tmv, 0);
          this.orderData.type = this.common.changeStr(data.type, 0);
          this.orderData.ymv = this.common.changeStr(data.ymv, 0);
          this.orderData.zmv = this.common.changeStr(data.zmv, 0);
          this.ssecond = response.data.ssecond;
          this.setTimeLimit();
        } else {
          this.common.popToastView(response.msg);
        }
        this.isloading = false;
      }).catch(() => {
        this.common.popToastView('网络异常!');
        this.isloading = false;
      });
    }
  }

  //设置待付款剩余时间
  setTimeLimit() {
    if (this.ssecond != undefined && this.ssecond != null && this.ssecond > 0) {
      var timer = setInterval(() => {
        this.ssecond--;
        if (this.ssecond == 0) {
          clearInterval(timer);
          this.dftxt = "";
          this.orderData.type = 0;
        } else {
          let fz = parseInt((this.ssecond / 60) + '');//分
          let mz = this.ssecond % 60;//秒
          this.dftxt = '还剩' + fz + '分' + mz + '秒自动关闭';
        }
      }, 1000)
    } else {
      this.dftxt = "";
      this.orderData.type = 0;
    }
  }

  //cancel order
  cancelOrder() {
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
        'oid': this.oid,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'sign': sign,
        'stime': stime,
        'oid': this.oid
      };
      let api_url = this.common.urlList.cancelOrder;
      this.common.ajaxPost(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          this.goBack();
        } else {
          this.common.popToastView(response.msg);
        }
      }).catch(() => {
        this.common.popToastView('网络异常!');
      });
    }
  }

  goBuy() {
    if (!this.showBuy) {
      this.showBuy = true;
    }
  }

  closeBuy(e) {
    e.preventDefault();
    if (this.showBuy) {
      this.showBuy = false;
    }
  }

  checkType(flag) {
    if (flag == 0) {
      this.wxCheck = true;
      this.zfbCheck = false;
    } else if (flag == 1) {
      this.wxCheck = false;
      this.zfbCheck = true;
    }
  }

  goPay() {
    if (this.wxCheck || this.zfbCheck) {
      if (this.userInfo) {
        this.presentLoading();
        let uid = this.userInfo.uid;
        //时间差
        let timedifflong = 0;
        if (this.userInfo.timedifflong) {
          timedifflong = this.userInfo.timedifflong;
        }
        let stime = new Date().getTime() + timedifflong;
        let aid = this.orderData.aid;//收货地址id
        let gids = this.getPlayGoods();//获取选中的商品
        let sign = this.common.sign({
          'uid': uid,
          'stime': stime,
          'salt': this.userInfo.salt,//私钥
          'aid': aid,
          'gids': gids
        });//签名
        let param = {
          'uid': uid,
          'sign': sign,
          'stime': stime,
          'aid': aid,
          'gids': gids
        };
        if (this.zfbCheck) {
          //支付宝
          let api_url = this.common.urlList.alipay;
          // let api_url = 'http://agent.itying.com/alipay/index.php';
          this.common.ajaxPost(api_url, param).then((response: any) => {
            let code = response.code;
            if (code == 'success') {
              console.log(response.data);
              this.alipayAction(response.data);
            } else {
              if (this.loading) {
                this.loading.dismiss();
              }
              this.common.popToastView(response.data);
            }
          }).catch((e) => {
            if (this.loading) {
              this.loading.dismiss();
            }
            this.common.popToastView('网络异常!');
          });
        } else {
          //微信
          let wx_apiUrl: string = this.common.urlList.wxpay;
          this.common.ajaxPost(wx_apiUrl, param).then((response: any) => {
            let code = response.code;
            if (code == 'success') {
              this.wxpayAction(response.data);
            } else {
              if (this.loading) {
                this.loading.dismiss();
              }
              this.common.popToastView(response.data);
            }
          }).catch((e) => {
            if (this.loading) {
              this.loading.dismiss();
            }
            this.common.popToastView('网络异常!');
          });
        }
      } else {
        //未登录
        this.navController.navigateForward('/login');
      }
    } else {
      this.common.popToastView('请选择支付方式');
    }
  }

  //调用支付宝支付
  alipayAction(payInfo) {
    if (this.loading) {
      this.loading.dismiss();
    }
    let cthis = this;
    cordova.plugins.alipay.payment(payInfo, function success(response) {
      // 支付成功
      cthis.navController.navigateForward("/ordertabs/orderdc");
    }, function error(error) {
      // 支付失败
      console.log("支付失败" + error.resultStatus);
      cthis.common.popToastView('支付失败!');
      cthis.navController.navigateForward("/ordertabs/orderdf");
    });
  }

  //调用微信支付
  wxpayAction(payInfo) {
    if (this.loading) {
      this.loading.dismiss();
    }
    var params = {
      partnerid: payInfo.partnerid, // merchant id
      prepayid: payInfo.prepayid, // prepay id
      noncestr: payInfo.noncestr, // nonce
      timestamp: payInfo.timestamp, // timestamp
      sign: payInfo.sign,// signed string
      appid: payInfo.appid,
      package: payInfo.package
    };
    let cthis = this;
    Wechat.sendPaymentRequest(params, function (data) {
      //支付成功
      console.log(data);
      cthis.navController.navigateForward("/ordertabs/orderdc");
    }, function (reason) {
      //支付失败
      cthis.common.popToastView('支付失败!');
      cthis.navController.navigateForward("/ordertabs/orderdf");
    });
  }

  //获取要购买的商品
  getPlayGoods() {
    let gids = '';
    this.orderData.glist.forEach(item => {
      if (gids == '') {
        gids = item.gid;
      } else {
        gids = gids + ',' + item.gid;
      }
    });
    return gids;
  }

  goBack() {
    this.navController.back();
  }
}
