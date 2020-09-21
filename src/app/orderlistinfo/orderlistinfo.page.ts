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
  selector: 'app-orderlistinfo',
  templateUrl: './orderlistinfo.page.html',
  styleUrls: ['./orderlistinfo.page.scss'],
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
export class OrderlistinfoPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public showBuy = false;

  public wxCheck = true;
  public zfbCheck = false;

  public userInfo: any;
  public loading = null;

  public isloading = false;
  public timediff = 0;

  public addressInfo: any;
  public prices: any;

  public aid = "0";
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
      let obj = JSON.parse(data.iteminfo);
      this.data = obj;

      console.log(obj);

      this.aid = obj.addressid;
  });
  }

  ngOnInit() {

    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadUserInfo();

    this.loadData();
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
        'aid': this.aid,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'sign': sign,
        'aid': this.aid,
        'stime': stime
      };
      let api_url = this.common.wx_urlList.loadAddressInfo;
      this.common.post(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          let data = response.data;
          // @ts-ignore
          this.addressInfo = data;

          this.addressData.aid = data.id;
          this.addressData.realname = data.realname;
          this.addressData.mobile = data.mobile;
          this.addressData.province = data.province;
          this.addressData.city = data.city;
          this.addressData.area = data.area;
          this.addressData.address = data.province + data.city + data.area + data.address;
          this.addressData.isload = true;
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
    this.timediff = this.common.changeStr(this.store.get("timedifflong"), "0");
  }
}
