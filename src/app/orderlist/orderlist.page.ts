import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';

declare let cordova;
declare let Wechat: any;

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.page.html',
  styleUrls: ['./orderlist.page.scss'],
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
export class OrderlistPage implements OnInit {

  public isloading = false;
  public loading = null;
  public showBuy = false;

  public wxCheck = true;
  public zfbCheck = false;
  public zfloading = null;

  public userInfo: any;// user info

  public orderData = [];//订单数据

  public oid = '';

  public otype = '';

  public showPwdbox = false;

  public showBuyInfo = false;

  public pwdstr1 = '';
  public pwdstr2 = '';
  public pwdstr3 = '';
  public pwdstr4 = '';
  public pwdstr5 = '';
  public pwdstr6 = '';
  public pwdval1 = '';
  public pwdval2 = '';
  public pwdval3 = '';
  public pwdval4 = '';
  public pwdval5 = '';
  public pwdval6 = '';
  constructor(
    public navController: NavController,
    public loadingController: LoadingController,
    public store: StorageService,
    public common: CommonService,
    public activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let param = this.activatedRoute.snapshot.data;
    if (param.type) {
      this.otype = param.type;

      if (param.type == "0") {
        this.otype = "";
      } else if (param.type == "1") {
        this.otype = "0";
      } else if (param.type == "2") {
        this.otype = "1";
      } else if (param.type == "3") {
        this.otype = "2";
      } else if (param.type == "4") {
        this.otype = "3";
      }
    }
    this.loadUserInfo();
    if (this.userInfo) {
      this.loadData(null);
    } else {
      this.orderData = [];
    }
  }

  async presentLoading() {
    this.zfloading = await this.loadingController.create({
      message: '提交中...',
    });
    await this.zfloading.present();
  }

  //获取登录成功后信息
  loadData(event) {
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
        'status': this.otype,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'sign': sign,
        'stime': stime,
        'status': this.otype
      };
      console.log("orderList data  param :" + JSON.stringify(param));

      let api_url = this.common.wx_urlList.getOrderList;
      this.common.post(api_url, param).then((response: any) => {


        let code = response.code;
        if (code == 'success') {
          console.log(response);
          this.orderData = response.data.list;
          // this.orderData = this.tempData.data.list.filter(item=>item.status==this.activatedRoute.snapshot.data.type||this.activatedRoute.snapshot.data.type=='0')

        } else {
          this.common.popToastView(response.msg);
        }
        if (event) {
          event.target.complete();
        }
        this.isloading = false;
      }).catch(() => {
        this.isloading = false;
        if (event) {
          event.target.complete();
        }
        this.common.popToastView('网络异常!');
      });
    }
  }

  loadUserInfo() {
    this.userInfo = this.store.get('userInfo');
  }

  //order info
  orderInfo(item) {
    if (this.showBuyInfo){
      console.log("budakai");
      this.showBuyInfo = false;
    }else {
      this.navController.navigateForward(['/orderlistinfo'], {
        queryParams: {
          'iteminfo': JSON.stringify(item)
        }
      });
    }
  }
  goBuy(oid) {
    this.showBuyInfo = false;
    if (!this.showBuy) {
      this.showBuy = true;
    }
    this.oid = oid;
  }
  closeBuy(e) {
    this.showBuyInfo = true;
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

  //del order 
  delOrder(oid) {
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
        'oid': oid,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'sign': sign,
        'stime': stime,
        'oid': oid
      };
      let api_url = this.common.urlList.delOrder;
      this.common.ajaxPost(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          if (this.orderData && this.orderData.length > 0) {
            this.orderData.splice(this.orderData.findIndex(item => item.oid === oid), 1);
          }
        } else {
          this.common.popToastView(response.msg);
        }
      }).catch(() => {
        this.common.popToastView('网络异常!');
      });
    }
  }

  //cancel order
  cancelOrder(oid) {
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
        'oid': oid,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'sign': sign,
        'stime': stime,
        'oid': oid
      };
      let api_url = this.common.urlList.cancelOrder;
      this.common.ajaxPost(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          if (this.orderData && this.orderData.length > 0) {
            this.orderData.splice(this.orderData.findIndex(item => item.oid === oid), 1);
          }
        } else {
          this.common.popToastView(response.msg);
        }
      }).catch(() => {
        this.common.popToastView('网络异常!');
      });
    }
  }

  //go logistics info
  goWlInfo(oid) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'oid': oid }
    };
    this.router.navigate(['/logistics'], navigationExtras);
  }

  //确认收货
  goSh(oid) {
    this.oid = oid;
    if (!this.showPwdbox) {
      this.showPwdbox = true;
    }
  }

  //键盘输入
  keyword(val) {
    if (val == -1) {
      //删除
      if (this.pwdval6 != '') {
        this.pwdval6 = '';
        this.pwdstr6 = '';
      } else if (this.pwdval5 != '') {
        this.pwdval5 = '';
        this.pwdstr5 = '';
      } else if (this.pwdval4 != '') {
        this.pwdval4 = '';
        this.pwdstr4 = '';
      } else if (this.pwdval3 != '') {
        this.pwdval3 = '';
        this.pwdstr3 = '';
      } else if (this.pwdval2 != '') {
        this.pwdval2 = '';
        this.pwdstr2 = '';
      } else if (this.pwdval1 != '') {
        this.pwdval1 = '';
        this.pwdstr1 = '';
      }
    } else {
      if (this.pwdval1 === '') {
        this.pwdval1 = val;
        this.pwdstr1 = '●';
        this.pwdval2 = '';
        this.pwdstr2 = '';
        this.pwdval3 = '';
        this.pwdstr3 = '';
        this.pwdval4 = '';
        this.pwdstr4 = '';
        this.pwdval5 = '';
        this.pwdstr5 = '';
        this.pwdval6 = '';
        this.pwdstr6 = '';
      } else if (this.pwdval2 === '') {
        this.pwdval2 = val;
        this.pwdstr2 = '●';
        this.pwdval3 = '';
        this.pwdstr3 = '';
        this.pwdval4 = '';
        this.pwdstr4 = '';
        this.pwdval5 = '';
        this.pwdstr5 = '';
        this.pwdval6 = '';
        this.pwdstr6 = '';
      } else if (this.pwdval3 === '') {
        this.pwdval3 = val;
        this.pwdstr3 = '●';
        this.pwdval4 = '';
        this.pwdstr4 = '';
        this.pwdval5 = '';
        this.pwdstr5 = '';
        this.pwdval6 = '';
        this.pwdstr6 = '';
      } else if (this.pwdval4 === '') {
        this.pwdval4 = val;
        this.pwdstr4 = '●';
        this.pwdval5 = '';
        this.pwdstr5 = '';
        this.pwdval6 = '';
        this.pwdstr6 = '';
      } else if (this.pwdval5 === '') {
        this.pwdval5 = val;
        this.pwdstr5 = '●';
        this.pwdval6 = '';
        this.pwdstr6 = '';
      } else if (this.pwdval6 === '') {
        this.pwdval6 = val;
        this.pwdstr6 = '●';
      }
      if (this.pwdval1 !== '' && this.pwdval2 !== '' && this.pwdval3 !== ''
        && this.pwdval4 !== '' && this.pwdval5 !== '' && this.pwdval6 !== '') {
        this.confirmOrder();
      }
    }
  }

  //确认收货
  confirmOrder() {
    if (this.userInfo) {
      this.presentLoading();
      let uid = this.userInfo.uid;
      //时间差
      let timedifflong = 0;
      if (this.userInfo.timedifflong) {
        timedifflong = this.userInfo.timedifflong;
      }
      let stime = new Date().getTime() + timedifflong;
      let pwd = this.common.md5(this.pwdval1 + '' + this.pwdval2 + this.pwdval3 + this.pwdval4 + this.pwdval5 + this.pwdval6);
      let sign = this.common.sign({
        'uid': uid,
        'stime': stime,
        'salt': this.userInfo.salt,//私钥
        'oid': this.oid,
        'pwd': pwd
      });//签名
      let param = {
        'uid': uid,
        'sign': sign,
        'stime': stime,
        'oid': this.oid,
        'pwd': pwd
      };
      let api_url = this.common.urlList.confirmOrder;
      this.common.ajaxPost(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          this.showPwdbox = false;
          if (this.orderData && this.orderData.length > 0) {
            this.orderData.splice(this.orderData.findIndex(item => item.oid === this.oid), 1);
            this.oid = '';
          }
        } else {
          this.common.popToastView(response.msg);
          this.pwdstr1 = '';
          this.pwdstr2 = '';
          this.pwdstr3 = '';
          this.pwdstr4 = '';
          this.pwdstr5 = '';
          this.pwdstr6 = '';
          this.pwdval1 = '';
          this.pwdval2 = '';
          this.pwdval3 = '';
          this.pwdval4 = '';
          this.pwdval5 = '';
          this.pwdval6 = '';
        }
        setTimeout(() => {
          if (this.zfloading) {
            this.zfloading.dismiss();
            this.zfloading = null;
          }
        }, 400);
      }).catch((e) => {
        if (this.zfloading) {
          this.zfloading.dismiss();
        }
        this.common.popToastView('网络异常!');
      });
    }
  }

  closePwdBox() {
    if (this.showPwdbox) {
      this.showPwdbox = false;
      this.pwdstr1 = '';
      this.pwdstr2 = '';
      this.pwdstr3 = '';
      this.pwdstr4 = '';
      this.pwdstr5 = '';
      this.pwdstr6 = '';
      this.pwdval1 = '';
      this.pwdval2 = '';
      this.pwdval3 = '';
      this.pwdval4 = '';
      this.pwdval5 = '';
      this.pwdval6 = '';
    }
  }
  pay() {
    let oid = this.oid;
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
        let type;
        if (this.wxCheck){
          type = "wechat";
        }else {
          type = "alipay";
        }

        let sign = this.common.sign({
          'uid': uid,
          'stime': stime,
          'salt': this.userInfo.salt,//私钥
          'oid': oid,
          'type': type
        });//签名
        let param = {
          'sign': sign,
          'uid': uid,
          'stime': stime,
          'oid': oid,
          'type': type
        };
        console.log("getCommitOrderPay param  :  "+param);
        let api_url = this.common.wx_urlList.commitOrderPay;
        this.common.ajaxPost(api_url, param).then((response: any) => {
          let code = response.code;
          if (code == 'success') {
            console.log("getCommitOrderPay:    "+JSON.stringify(response.data));
            if (this.wxCheck){
              this.wxpayAction(response.data);
            }else {
              this.alipayAction(response.data);
            }
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


        // if (this.zfbCheck) {
        //   //支付宝
        //   let api_url = this.common.urlList.alipay;
        //   // let api_url = 'http://agent.itying.com/alipay/index.php';
        //   this.common.ajaxPost(api_url, param).then((response: any) => {
        //     let code = response.code;
        //     if (code == 'success') {
        //       console.log(response.data);
        //       this.alipayAction(response.data);
        //     } else {
        //       if (this.loading) {
        //         this.loading.dismiss();
        //       }
        //       this.common.popToastView(response.data);
        //     }
        //   }).catch((e) => {
        //     if (this.loading) {
        //       this.loading.dismiss();
        //     }
        //     this.common.popToastView('网络异常!');
        //   });
        // } else {
        //   //微信
        //   let wx_apiUrl: string = this.common.urlList.wxpay;
        //   this.common.ajaxPost(wx_apiUrl, param).then((response: any) => {
        //     let code = response.code;
        //     if (code == 'success') {
        //       this.wxpayAction(response.data);
        //     } else {
        //       if (this.loading) {
        //         this.loading.dismiss();
        //       }
        //       this.common.popToastView(response.data);
        //     }
        //   }).catch((e) => {
        //     if (this.loading) {
        //       this.loading.dismiss();
        //     }
        //     this.common.popToastView('网络异常!');
        //   });
        // }
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
      package: payInfo.mpackage
    };

    console.log("wxpay param   :     "+JSON.stringify(params));
    let cthis = this;
    Wechat.sendPaymentRequest(params, function (data) {
      //支付成功
      console.log("wxpay :  "+JSON.stringify(data));
      cthis.navController.navigateForward("/ordertabs/orderdc");
    }, function (reason) {
      //支付失败
      cthis.common.popToastView('支付失败!');
      cthis.navController.navigateForward("/ordertabs/orderdf");
    });
  }

}
