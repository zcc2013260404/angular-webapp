import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatusbarService } from '../services/statusbar.service';
import { CommonService } from '../services/common.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-dcoupon',
  templateUrl: './dcoupon.page.html',
  styleUrls: ['./dcoupon.page.scss'],
})
export class DcouponPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public activeIndex = 0;//激活的tab
  public showdbox = false;//兑换框

  public isloading = false;

  public userInfo: any;// user info

  public ddata = [];

  public wcount = 0;//未使用
  public scount = 0;//失效

  constructor(
    private statusbarService: StatusbarService,
    public navController: NavController,
    public common: CommonService,
    public store: StorageService) { }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadUserInfo();
    this.loadData("");
  }

  goBack() {
    this.navController.back();
  }

  switch(index) {
    this.activeIndex = index;
    if (index==1){
      this.loadData("past");
    }else {
      this.loadData("");
    }

    // this.loadData(index);
  }

  duihuan() {
    this.common.popToastView('无效兑换码!');
  }

  loadData(type) {
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
        'cate': type,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'sign': sign,
        'stime': stime,
        'cate': type
      };
      let api_url = this.common.wx_urlList.getCouponList;
      this.common.post(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          console.log(response);
          this.ddata = response.data.list;
          if (type == "") {
            //未使用
            this.wcount = this.ddata.length;
          } else if (type == "past") {
            //失效
            this.scount = this.ddata.length;
          }
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
