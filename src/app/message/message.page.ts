import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatusbarService } from '../services/statusbar.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  public headerBarPaddingTop = '0px';

  public isloading = false;

  public activeIndex = 0;//激活的tab
  public mdata = [{
    pic:"https://weixing.ahhmtl.com/addons/ewei_shopv2/template/mobile/default/static/images/coupon/ling.png",
    nt:"dsf",
    ns:"fsdfasdf",
    nm:"fsdfsdafsd"
  }];

  constructor(
    private statusbarService: StatusbarService,
    public navController: NavController,
    public common: CommonService) {
  }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
  }

  goBack() {
    this.navController.back();
  }

  //load data from server
  loadData(event) {
    this.isloading = true;
    let api_url = this.common.urlList.loadNotices;
    this.common.ajaxGet(api_url).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        this.mdata = response.data;//message data
        if (event) {
          event.target.complete();
        }
        this.isloading = false;
      } else {
        this.isloading = false;
        if (event) {
          event.target.complete();
        }
        this.common.popToastView('网络异常!');
      }
    }).catch(() => {
      this.isloading = false;
      if (event) {
        event.target.complete();
      }
      this.common.popToastView('网络异常!');
    });
  }

  //tab switch
  messageSwitch(index) {
    this.activeIndex = index;
    // this.mdata = [];
    if (index == 0) {

    } else {
      if (this.mdata.length == 0) {
        // this.loadData(null);
      }
    }
  }
}
