import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StatusbarService } from '../services/statusbar.service';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';


@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.page.html',
  styleUrls: ['./logistics.page.scss'],
})
export class LogisticsPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public isloading = false;

  public oid = '';//订单id
  public userInfo: any;// user info
  public wname = '';
  public wnum = '';
  public logisticsData = [];

  constructor(
    private statusbarService: StatusbarService,
    public store: StorageService,
    public common: CommonService,
    private route: ActivatedRoute,
    public navController: NavController) {
    this.route.queryParams.subscribe(data => {
      if (data) {
        this.oid = data.oid;
      }
    });
  }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadUserInfo();
    this.loadData();
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
        'oid': this.oid,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'sign': sign,
        'stime': stime,
        'oid': this.oid
      };
      let api_url = this.common.urlList.loadOrderLogistics;
      this.common.ajaxPost(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          this.wname = response.data.wname;
          this.wnum = response.data.wnum;
          this.logisticsData = response.data.wlist;
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

  goBack() {
    this.navController.back();
  }

}
