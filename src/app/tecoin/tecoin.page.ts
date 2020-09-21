import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { StatusbarService } from '../services/statusbar.service';

@Component({
  selector: 'app-tecoin',
  templateUrl: './tecoin.page.html',
  styleUrls: ['./tecoin.page.scss'],
})
export class TecoinPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public isloading = false;

  public activeIndex = 0;//激活的tab

  public userInfo: any;// user info

  public tdata = [];

  public wcount = 0;//未使用
  public xcount = 0;//未生效
  public scount = 0;//失效


  constructor(
    private statusbarService: StatusbarService,
    public navController: NavController,
    public common: CommonService,
    public store: StorageService) { }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadUserInfo();
    this.loadData(0);
  }

  goBack() {
    this.navController.back();
  }

  tecoinSwitch(index) {
    this.activeIndex = index;
    this.loadData(index);
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
        'type': type,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'sign': sign,
        'stime': stime,
        'type': type
      };
      let api_url = this.common.urlList.loadTecoin;
      this.common.ajaxPost(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          this.tdata = response.data.tlist;
          this.wcount = response.data.wcount;
          this.xcount = response.data.xcount;
          this.scount = response.data.scount;
          if (type == 0) {
            //未使用
            this.wcount = this.tdata.length;
          } else if (type == 1) {
            //未生效
            this.scount = this.tdata.length;
          } else if (type == 2) {
            //失效
            this.scount = this.tdata.length;
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
