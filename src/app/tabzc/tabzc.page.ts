import { Component, OnInit } from '@angular/core';
import { StatusbarService } from '../services/statusbar.service';
import { CommonService } from '../services/common.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-tabzc',
  templateUrl: './tabzc.page.html',
  styleUrls: ['./tabzc.page.scss'],
})
export class TabzcPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public isloading = false;

  public data = [];

  public pn = 0;

  constructor(
    private statusbarService: StatusbarService,
    public common: CommonService,
    public eventService: EventService) {
  }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadData(null);
  }

  loadData(event) {
    this.isloading = true;
    let api_url = this.common.wx_urlList.loadZcList;
    this.common.post(api_url, { 'page': this.pn }).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        var rdata = response.data; console.log(rdata);
        if (rdata && rdata.length > 0) {
          this.data = [];
          rdata.forEach(element => {
            this.data.push({
              'rpic': element.avatar,
              'rname': element.nickname,
              'rtime': element.createtime,
              'content': element.content,
              'images': element.images,
              'gid': element.gid,
              'url': element.zurl,
              'spic': element.zpic
            });
          });
        }
        if (event) {
          event.target.complete();
        }
        this.isloading = false;
      } else {
        if (event) {
          event.target.complete();
        }
        this.isloading = false;
        this.common.popToastView('网络异常!');
      }
    }).catch(() => {
      if (event) {
        event.target.complete();
      }
      this.isloading = false;
      this.common.popToastView('网络异常!');
    });
  }

  //分享
  share(gpic, gtxt, gurl) {
    if (!gurl) {
      gurl = 'www.ahhmtl.com';
    }
    this.eventService.event.emit('showShare', { 'gpic': gpic, 'gtxt': gtxt, 'gurl': gurl });
  }
}
