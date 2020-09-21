import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from "ts-md5/dist/md5";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public wx_config: any = {
    domain: 'https://weixing.ahhmtl.com'
  };

  public wx_urlList: any = {
    //获取服务器时间
    loadServerLongTime: '/app/weixing_hyl_api.php?i=2&r=shop.getServerLongTime',
    //商品页面
    loadGoodsInfo: '/app/weixing_hyl_api.php?i=2&r=shop.index',
    //商品分类左侧
    loadGoodsTypes: '/app/weixing_hyl_api.php?i=2&r=shop.getCategory',
    //商品分类右侧
    loadGoodsTypeInfo: '/app/weixing_hyl_api.php?i=2&r=shop.getCategorySon',
    //商品热搜词
    loadGoodsHotWord: '/app/weixing_hyl_api.php?i=2&r=goods.getGoodsHotWord',
    //商品搜索
    loadGoodsSearch: '/app/weixing_hyl_api.php?i=2&r=goods.getGoodsSearch',
    //购物车
    loadMyGoodsCarts: '/app/weixing_hyl_api.php?i=2&r=member.cart.getMyGoodsCarts',
    //购物车商品增减
    opraGoodsCartNum: '/app/weixing_hyl_api.php?i=2&r=member.cart.update',
    //购物车商品选中
    selectGoodsCart: '/app/weixing_hyl_api.php?i=2&r=member.cart.select',
    //购物车商品删除
    delGoodsCartGoods: '/app/weixing_hyl_api.php?i=2&r=member.cart.remove',
    //购物车提交
    commitGoodsCart: '/app/weixing_hyl_api.php?i=2&r=member.cart.submit',
    //确认订单
    confirmOrder: '/app/weixing_hyl_api.php?i=2&r=order.confirm',
    //提交订单
    commitOrder: '/app/weixing_hyl_api.php?i=2&r=order.create',
    //提交支付
    commitOrderPay: '/app/weixing_hyl_api.php?i=2&r=order.pay',
    //获取订单列表
    getOrderList: '/app/weixing_hyl_api.php?i=2&r=member.order.get_list',
    //商品推荐分类点击
    loadGoodsRecTypeList: '/app/weixing_hyl_api.php?i=2&r=goods.getGoodsRecTypeList',
    //商品详情
    loadGoodInfo: '/app/weixing_hyl_api.php?i=2&r=goods.getGoodInfo',
    //商品详情商品规格
    loadGoodAttr: '/app/weixing_hyl_api.php?i=2&r=goods.getPicker',
    //限时特卖时间列表
    loadGoodLimitTimes: '/app/weixing_hyl_api.php?i=2&r=seckill.get_list',
    //限时特卖商品
    loadGoodLimitData: '/app/weixing_hyl_api.php?i=2&r=seckill.get_goods',
    //限时特卖商品昨日
    loadGoodLimitYdata: '/app/weixing_hyl_api.php?i=2&r=seckill.get_y_goods',
    //直播页面
    loadLiveInfo: '/app/weixing_hyl_api.php?i=2&r=live.info',
    //直播分类列表
    loadLiveList: '/app/weixing_hyl_api.php?i=2&r=live.get_list',
    //种草
    loadZcList: '/app/weixing_hyl_api.php?i=2&r=grass.get_list',

    //获取验证码
    loadLoginCode: '/app/weixing_hyl_api.php?i=2&r=member.account.getLoginCode',
    //验证码登录
    loginByPhoneCode: '/app/weixing_hyl_api.php?i=2&r=member.account.getByPhoneCode',

    wxLogin: '/app/weixing_hyl_api.php?i=2&r=member.account.wxLogin',

    //加载我的
    loadMyInfo: '/app/weixing_hyl_api.php?i=2&r=member.index.getMyInfo',

    loadStoreInfo: '/app/weixing_hyl_api.php?i=2&r=shop.getStoreInfo',

    loadAddress: '/app/weixing_hyl_api.php?i=2&r=member.address.get_list',
    //获取地址详情
    loadAddressInfo: '/app/weixing_hyl_api.php?i=2&r=member.address.get_detail',

    saveAddress: '/app/weixing_hyl_api.php?i=2&r=member.address.submit',

    loadAdvanceLive : '/app/weixing_hyl_api.php?i=2&r=member.advance.get_list',
    //设置默认收货地址
    defaultAddress: '/app/weixing_hyl_api.php?i=2&r=member.address.set_default',

    addLive: '/app/weixing_hyl_api.php?i=2&r=member.live.add',

    uploadFile: '/app/weixing_hyl_api.php?i=2&r=util.uploader',

    addCar: '/app/weixing_hyl_api.php?i=2&r=member.cart.add',
    //修改用户信息
    updataUserInfo: '/app/weixing_hyl_api.php?i=2&r=member.info.edit',
    //获取直播列表
    getLiveList: '/app/weixing_hyl_api.php?i=2&r=member.live.get_list',
    //获取直播预告
    getLiveAdvice: '/app/weixing_hyl_api.php?i=2&r=member.advance.get_list',
  //    获取创建直播商品列表接口
    getLiveCommodity: '/app/weixing_hyl_api.php?i=2&r=member.live.get_goods',

    //添加认证
    addNameAuth: '/app/weixing_hyl_api.php?i=2&r=member.info.attestation',

    //查看认证
    getNameAuth: '/app/weixing_hyl_api.php?i=2&r=member.info.selectatte',
    //查看邀约店铺信息
    getInvitationShop: '/app/weixing_hyl_api.php?i=2&r=member.merch.select',
    //绑定邀请店铺信息
    bindInvitationShop: '/app/weixing_hyl_api.php?i=2&r=member.merch.bind',
    // 关于我们
    aboutus: '/app/weixing_hyl_api.php?i=2&r=member.index.about',
    // 用户协议
    useragreement: '/app/weixing_hyl_api.php?i=2&r=member.index.agreement',
    // 优惠券列表
    getCouponList: '/app/weixing_hyl_api.php?i=2&r=member.coupon.getlist',
  };


  public config: any = {
    // domain: 'http://123.56.61.153:8080/wxlive/',
    domain: 'https://weixing.ahhmtl.com/',
    // ws_host: '192.168.8.187',
    ws_host: '192.168.1.122',
    ws_port: 8080,
    ws_path: '/live'
  }

  public urlList: any = {
    loadServerLongTime: 'api/loadServerLongTime',//(1)
    loadLiveInfo: "api/loadLiveInfo",//(2)
    loadLiveList: "api/loadLiveList",//(26)
    loadGoodsInfo: "api/loadGoodsInfo",//(3)
    loadGoodsTypes: "api/loadGoodsTypes",//(4)
    loadGoodsTypeInfo: "api/loadGoodsTypeInfo",//(5)
    loadGoodsRecTypeList: "api/loadGoodsRecTypeList",//(26)
    loadStoreInfo: "api/loadStoreInfo",//(6)
    loadLoginCode: "api/loadLoginCode",//(7)
    loginByPhoneCode: "api/loginByPhoneCode",//(8)
    loadMyInfo: "api/loadMyInfo",//(9)
    loadNotices: "api/loadNotices",//(10)
    loadOrder: "api/loadOrder",//(11)
    delOrder: "api/delOrder",//(12)
    cancelOrder: "api/cancelOrder",//(13)
    loadOrderInfo: "api/loadOrderInfo",//(14)
    loadOrderLogistics: "api/loadOrderLogistics",//(15)
    confirmOrder: "api/confirmOrder",//(16)
    loadTecoin: "api/loadTecoin",//(17)
    loadDcoupon: "api/loadDcoupon",//(18)
    loadAddress: "api/loadAddress",//(19)
    loadAddressInfo: "api/loadAddressInfo",//(20)
    saveAddress: "api/saveAddress",//(21)
    loadGoodsHotWord: "api/loadGoodsHotWord",//(22)
    loadLiveHotWord: "api/loadLiveHotWord",//(23)
    loadGoodsSearch: "api/loadGoodsSearch",//(24)
    loadLiveSearch: "api/loadLiveSearch",//(25)
    alipay: "api/alipay",
    wxpay: "api/wxpay",
    wxLogin: "api/wxLogin"
  };

  constructor(public toastController: ToastController, public http: HttpClient) { }

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
  };

  /**
   * api get
   */
  get(url: String) {
    let api = this.wx_config.domain + url;
    return new Promise((resove, reject) => {
      this.http.get(api).subscribe((response) => {
        resove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  /*
 api post
 */
  post(url: String, json: Object) {
    let api = this.wx_config.domain + url;
    console.log("post:   " + api);
    return new Promise((resove, reject) => {
      this.http.post(api, json).subscribe((response) => {
        resove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  postFile(url: String, fileToUpload: File){
    const endpoint = this.wx_config.domain + url;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return new Promise((resove, reject) => {
      this.http.post(endpoint, formData, )
        .subscribe((response) => {
          resove(response);
        }, (error) => {
          reject(error);
        })
    })
  }

  /**
   * api get
   */
  ajaxGet(url: String) {
    let api = this.config.domain + url;
    return new Promise((resove, reject) => {
      this.http.get(api).subscribe((response) => {
        resove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  /*
 api post
 */
  ajaxPost(url: String, json: Object) {
    let api = this.config.domain + url;
    return new Promise((resove, reject) => {
      this.http.post(api, json).subscribe((response) => {
        resove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  /**
   * local get
   */
  localGet() {
    return new Promise((resove, reject) => {
      this.http.get('../../assets/data/city-data.json').subscribe((response) => {
        resove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  /**
   * signature
   */
  sign(json) {
    let tempArr = [];
    for (let attr in json) {
      tempArr.push(attr);
    }
    tempArr = tempArr.sort();
    let tempStr = '';
    for (let j = 0; j < tempArr.length; j++) {
      tempStr += tempArr[j] + json[tempArr[j]];
    }
    return Md5.hashStr(tempStr);
  }

  /**
   * 字符串md5加密
   * @param txt 加密字符串
   */
  md5(txt) {
    return Md5.hashStr(txt);
  }

  /**
   * toast
   * @param msg what toast is
   */
  async popToastView(msg) {
    const toast = await this.toastController.create({
      color: 'medium',
      duration: 2000,
      message: msg
    });
    await toast.present();
  };

  /**
   * 
   * @param obj 将空字符串转化为指定字符串
   * @param rstr 要替换的字符串
   */
  changeStr(obj, rstr) {
    if (obj == '' || obj == undefined || obj == null) {
      return rstr;
    } else {
      return obj;
    }
  }



  timestampToTime(timestamp) {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D+h+m+s;
  }
}
