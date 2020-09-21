import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { EventService } from '../services/event.service';

declare let window;

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
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
export class TabsPage implements OnInit {

  public showShare = false;

  public shareInfo = { 'gpic': '', 'gtxt': '', 'gurl': '' };

  constructor(
    public store: StorageService,
    public common: CommonService,
    public eventService: EventService) {
  }

  ngOnInit() {
    this.loadTimeDiff();
    this.monitorLogined();
  }

  loadTimeDiff() {
    //get local time long and load server time long
    let api_url = this.common.wx_urlList.loadServerLongTime;
    this.common.get(api_url).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        let ctm = new Date().getTime();
        let stm = response.data;
        if (stm) {
          this.store.set('timedifflong', stm - ctm);
        }
      } else {
        this.common.popToastView('网络异常!');
        this.store.set('timedifflong', 0);
      }
    }).catch(() => {
      this.common.popToastView('网络异常!');
      this.store.set('timedifflong', 0);
    });
  }

  monitorLogined() {
    this.eventService.event.on("showShare", (e) => {
      if (e) {
        this.shareInfo.gpic = e.gpic;
        this.shareInfo.gtxt = e.gtxt;
        this.shareInfo.gurl = e.gurl;
      }
      this.showShare = true;
    });
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

  closeShare() {
    if (this.showShare) {
      this.showShare = false;
    }
  }
}
