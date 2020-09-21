import { Component, OnInit } from '@angular/core';
import { StatusbarService } from '../services/statusbar.service';
import { NavController, LoadingController } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { ActivatedRoute } from '@angular/router';
import {EventService} from '../services/event.service';

declare let cordova;
declare let Wechat: any;
@Component({
  selector: 'app-ordercommit',
  templateUrl: './ordercommit.page.html',
  styleUrls: ['./ordercommit.page.scss'],
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
export class OrdercommitPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public showBuy = false;

  public wxCheck = true;
  public zfbCheck = false;

  public userInfo: any;
  public loading = null;
  public timediff = 0;

  public goods: any;
  public addressInfo: any;
  public prices: any;

  public isCar = 1;
  public gid: any;
  public optionid: any;
  public total: any;
  public data: any;
  public addressData = {
    'aid': '0',
    'realname': '',
    'mobile': '',
    'province': '陕西省',
    'city': '西安市',
    'area': '雁塔区',
    'address': '',
    'isdefault': false,
    'isload': false,
  };
  public isChooseAddress = false;
  constructor(
    private statusbarService: StatusbarService,
    public store: StorageService,
    public navController: NavController,
    public loadingController: LoadingController,
    public common: CommonService,
    public route: ActivatedRoute) {
    this.route.queryParams.subscribe((data) => {

      if (data.type=="address"){
        this.isChooseAddress = true;
        this.addressInfo = data;

        this.addressData.aid = data.id;
        this.addressData.realname = data.realname;
        this.addressData.mobile = data.mobile;
        this.addressData.province = data.province;
        this.addressData.city = data.city;
        this.addressData.area = data.area;
        this.addressData.address = data.province + data.city + data.area + data.address;
        this.addressData.isload = true;

        console.log(this.addressData);
      }else if (data.type == "shop"){
        this.gid = data.gid;
        this.optionid = data.optionid;
        this.total = data.total;
        this.isCar = data.isCar;
      }
  });
  }

  ngOnInit() {

    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadUserInfo();
    // this.monitorLogined();


    this.getOrderInfo();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: '加载中...',
    });
    await this.loading.present();
  }

  // monitorLogined() {
  //   this.eventService.event.on("userLogined", () => {
  //     this.loadUserInfo();
  //   });
  // }

  goBack() {
    this.navController.back();
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
  configAddress(){
    console.log("configAddress");
    this.navController.navigateForward('/orderaddresslist');

  }
  getOrderInfo(){
    let uid = this.userInfo.uid;
    //时间差
    let timedifflong = this.timediff;
    let stime = (new Date().getTime() + timedifflong) + '';

    let param = {};
    if (this.isCar == 1){
      let pp1 = {
        'uid': uid,
        'stime': stime,
        'salt': this.userInfo.salt//私钥
      };

      param = {
        'uid': uid,
        'stime': stime,
        'sign': this.common.sign(pp1)
      };
    }else {
      let pp1 = {
        'uid': uid,
        'stime': stime,
        'gid': this.gid,
        'optionid': this.optionid,
        'total': this.total,
        'salt': this.userInfo.salt//私钥
      };
      param = {
        'uid': uid,
        'stime': stime,
        'gid': this.gid,
        'optionid': this.optionid,
        'total': this.total,
        'sign': this.common.sign(pp1)
      };
    }
    let api_url = this.common.wx_urlList.confirmOrder;
    this.common.post(api_url, param).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        console.log("confirm order :" + JSON.stringify(response));
        if (this.isChooseAddress == false){
          let addressInfo = response.data.address;
          this.addressData.aid = addressInfo.id;
          this.addressData.realname = addressInfo.realname;
          this.addressData.mobile = addressInfo.mobile;
          this.addressData.address = addressInfo.province+addressInfo.city+addressInfo.area+addressInfo.address;
          this.addressData.isload = true;
        }
        let gdata = response.data.goods;
        if (gdata) {
          let sdata = [];
          let slist = [];
          let goods = [];

          let prices = 0;

          gdata.forEach(element => {
            slist = element.goods;
            goods = [];
            let allprice = 0;
            slist.forEach(element2 => {
              allprice = allprice + element2.promotionprice;

              goods.push({
                'gsid': element2.id,//商品所在购物车id
                'gid': element2.goodsid,
                'gpic': element2.thumb,
                'gtitle': element2.title,
                'goptionid': element2.optionid,
                'goptiontitle': element2.optiontitle,
                'gprice': element2.marketprice,
                'gcount': element2.total,
              });
            });
            sdata.push({
              'sname': element.shopname,
              'goods': goods,
              'price': allprice,
              'dispatch_price':element.dispatch_price,
              'remark': "",
            });
            prices = prices + allprice;
          });

          console.log(sdata);
          this.goods = sdata;
          this.prices = prices;
        } else {
          this.common.popToastView(response.msg);
        }

        this.data = response.data;

      }
    }).catch((e) => {
      this.common.popToastView('网络异常!');
    });

  }
  goPay(){
    if (this.addressData.aid =='0'){
      this.common.popToastView('请先添加默认地址!');
    }else {
      //遍历 goods,拿到 留言
      let remarks = {};
      this.goods.forEach(good =>{
        remarks[good.sname] = good.remark;
      });
      console.log(this.goods);

      //  组装 json
      let info = {};
      let shops = [];
      this.data.goods.forEach(good =>{
        let shop = {};
        shop['shopname'] = good.shopname;
        shop['remark'] = remarks[good.shopname];
        let items = [];
        good.goods.forEach(item =>{
          let iteminfo = {};

          iteminfo['id'] = item.id;
          iteminfo['goodsid'] = item.goodsid;
          iteminfo['optionid'] = item.optionid;
          iteminfo['optiontitle'] = item.optiontitle;
          iteminfo['total'] = item.total;
          iteminfo['price'] = item.price;
          iteminfo['marketprice'] = item.marketprice;
          iteminfo['merchid'] = item.merchid;
          shop['merchid'] = item.merchid;
          items.push(iteminfo);
        });
        shop['goods'] = items;

        shops.push(shop);

      });
      info['goods'] = shops;
      info['price0'] = this.prices;
      info['addressid'] = this.addressData.aid;
      info['fromcart'] = this.isCar;
      console.log(info);


      //uid，sign，stime，goods

      let uid = this.userInfo.uid;
      //时间差
      let timedifflong = this.timediff;
      let stime = (new Date().getTime() + timedifflong) + '';

      let pp1 = {
        'uid': uid,
        'stime': stime,
        'goods': info['goods'],
        'price0': info['price0'],
        'addressid': info['addressid'],
        'fromcart': info['fromcart'],
        'salt': this.userInfo.salt
      };
      let param = {
        'uid': uid,
        'stime': stime,
        'goods': info['goods'],
        'price0': info['price0'],
        'addressid': info['addressid'],
        'fromcart': info['fromcart'],
        'sign': this.common.sign(pp1)
      };
      console.log("commitOrder param:  "+JSON.stringify(param));
      let api_url = this.common.wx_urlList.commitOrder;
      this.common.post(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          console.log("commitOrder :    "+JSON.stringify(response));
          this.pay(response.data.orderid);
        }
      }).catch((e) => {
        this.common.popToastView('网络异常!');
      });

    }
  }



  pay(oid) {
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

  loadUserInfo() {
    this.userInfo = this.store.get('userInfo');
  }

  loadTimediff() {
    this.timediff = this.common.changeStr(this.store.get("timedifflong"), "0");
  }
}
