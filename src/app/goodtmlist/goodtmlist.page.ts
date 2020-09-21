import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { EventService } from '../services/event.service';
import { StatusbarService } from '../services/statusbar.service';

declare let window;

@Component({
  selector: 'app-goodtmlist',
  templateUrl: './goodtmlist.page.html',
  styleUrls: ['./goodtmlist.page.scss'],
  animations: [
    trigger('showShareType', [
      state('up', style({
        bottom: '0rem'
      })),
      state('down', style({
        bottom: '-23rem'
      })),
      transition('up => down', [animate('0.3s')]),
      transition('down => up', [animate('0.3s')])
    ])
  ]
})
export class GoodtmlistPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public isloading = false;

  public timelistWidth = 0;

  public timelist = [];

  public taskid = '';//专题id
  public roomid = '';//会场id
  public timeid = '';//场次id

  public pn = 0;

  public isLastPage = true;

  public xstmList: any[] = [];

  public canScroll = false;

  public showShare = false;
  public shareInfo = { 'gpic': '', 'gtxt': '', 'gurl': '' };

  @ViewChild('timebox') timebox: ElementRef;

  constructor(
    private statusbarService: StatusbarService,
    public navController: NavController,
    public common: CommonService,
    public eventService: EventService) {
  }

  ngAfterViewInit() {
    this.switchTime();
  }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadTimeData();
  }

  loadTimeData() {
    this.isloading = true;
    let api_url = this.common.wx_urlList.loadGoodLimitTimes;
    this.common.post(api_url, {}).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        this.taskid = response.data.taskid;
        this.roomid = response.data.roomid;
        this.timeid = response.data.timeid;
        var rdata = response.data.times;
        if (rdata && rdata.length > 0) {
          let tm = '';
          console.log(rdata);
          rdata.forEach(element => {

            var date = new Date();
            var h = date.getHours();

            var info = "待抢购";
            if (h==element.time){
              info = "抢购中";
            }

            if (element.time) {
              tm = element.time.length == 1 ? '0' + element.time + ':00' : element.time + ':00';
            }
            this.timelist.push({
              'id': element.id,
              'time': tm,
              'taskid': element.taskid,
              'info': info
            });
          });
          this.timelistWidth = (this.timelist.length + 1) * 80;
        }
        //加载场次下的商品
        this.loadTimeGoodData(null);
      } else {
        this.isloading = false;
        this.common.popToastView(response.msg);
      }
    }).catch(() => {
      this.isloading = false;
      this.common.popToastView('网络异常!');
    });
  }

  loadYTimeGoodData() {
    this.pn = 0;
    this.timeid = 'zr';
    this.xstmList = [];
    this.loadYesDayTimeGoodData(null);
  }

  loadYesDayTimeGoodData(event) {
    this.isloading = true;
    this.pn++;

    let api_url = this.common.wx_urlList.loadGoodLimitYdata;
    this.common.post(api_url, { 'page': this.pn }).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        var rdata = response.data;
        if (rdata && rdata.length > 0) {
          this.isLastPage = false;
          rdata.forEach(element => {
            this.xstmList.push({
              gid: element.goodsid,
              gpic: element.thumb,
              gm: element.title,
              gk: element.total,
              gp: element.marketprice,
              nowp: element.price,
              gb: element.percent,
              gl: element.link
            });
          });
        } else {
          if (this.pn > 1) {
            this.isLastPage = true;
          }
        }
      } else {
        this.common.popToastView(response.msg);
      }
      if (event) {
        event.target.complete();
      }
      this.isloading = false;
    }).catch((e) => {
      if (event) {
        event.target.complete();
      }
      this.isloading = false;
      this.common.popToastView('网络异常!');
    });
  }

  loadTimeGoodData(event) {
    this.isloading = true;
    this.pn++;
    let api_url = this.common.wx_urlList.loadGoodLimitData;
    let param = {
      'taskid': this.taskid,
      'roomid': this.roomid,
      'timeid': this.timeid,
      'page': this.pn
    };
    this.common.post(api_url, param).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        var rdata = response.data.goods;
        if (rdata && rdata.length > 0) {
          this.isLastPage = false;
          rdata.forEach(element => {
            this.xstmList.push({
              gid: element.goodsid,
              gpic: element.thumb,
              gm: element.title,
              gk: element.total,
              gp: element.marketprice,
              nowp: element.price,
              gb: element.percent,
              gl: element.link
            });
          });
        } else {
          if (this.pn > 1) {
            this.isLastPage = true;
          }
        }
      } else {
        this.common.popToastView(response.msg);
      }
      this.isloading = false;
      if (event) {
        event.target.complete();
      }
    }).catch(() => {
      this.isloading = false;
      if (event) {
        event.target.complete();
      }
      this.common.popToastView('网络异常!');
    });
  }

  searchPaper(event) {
    if (this.timeid == 'zr') {
      //昨日 
      this.loadYesDayTimeGoodData(event);
    } else {
      //限时
      this.loadTimeGoodData(event);
    }
  }

  changeTime(taskid, timeid) {
    this.pn = 0;
    this.taskid = taskid;
    this.timeid = timeid;
    this.switchTime();
    this.loadTimeGoodData(null);
  }

  goBack() {
    this.navController.back();
  }

  switchTime() {
    this.xstmList = [];
    let index = 0;
    this.timelist.forEach((val, idx) => {
      if (this.timeid == val) {
        index = idx;
        return false;
      }
    });
    this.canScroll = true;
    let ithis = this;
    this.timebox.nativeElement.scrollLeft = index * 80 - 50;
    this.timebox.nativeElement.onscroll = function () {
      if (ithis.canScroll) {
        this.scrollLeft = index * 80 - 50;
        ithis.canScroll = false;
      }
    };
  }

  //分享微信好友
  shareWxFrind() {
    if (this.shareInfo) {
      let gpic = this.shareInfo.gpic;
      if (!gpic) {
        gpic = 'www/assets/icon/favicon.png';
      }
      let gtxt = this.shareInfo.gtxt;
      if (!gtxt) {
        gtxt = '商品已下架';
      }
      let gurl = this.shareInfo.gurl;
      if (!gurl) {
        gurl = 'www.ahhmtl.com';
      }
      let cthis = this;
      window.Wechat.share({
        message: {
          title: "微莕商城",
          description: gtxt,
          thumb: gpic,
          media: {
            type: window.Wechat.Type.WEBPAGE,
            webpageUrl: gurl
          }
        },
        scene: window.Wechat.Scene.SESSION
      }, function () {
        cthis.closeShare();
      }, function (reason) {
        cthis.closeShare();
      });
    }
  }

  //分享微信圈
  shareWxQ() {
    if (this.shareInfo) {
      let gpic = this.shareInfo.gpic;
      if (!gpic) {
        gpic = 'www/assets/icon/favicon.png';
      }
      let gtxt = this.shareInfo.gtxt;
      if (!gtxt) {
        gtxt = '商品已下架';
      }
      let gurl = this.shareInfo.gurl;
      if (!gurl) {
        gurl = 'www.ahhmtl.com';
      }
      let cthis = this;
      window.Wechat.share({
        message: {
          title: "微莕商城",
          description: gtxt,
          thumb: gpic,
          media: {
            type: window.Wechat.Type.WEBPAGE,
            webpageUrl: gurl
          }
        },
        scene: window.Wechat.Scene.TIMELINE
      }, function () {
        cthis.closeShare();
      }, function (reason) {
        cthis.closeShare();
      });
    }
  }

  share(gpic, gtxt, gurl) {
    this.shareInfo.gpic = gpic;
    this.shareInfo.gtxt = gtxt;
    this.shareInfo.gurl = gurl;
    this.showShare = true;
  }

  closeShare() {
    if (this.showShare) {
      this.showShare = false;
    }
  }

}
