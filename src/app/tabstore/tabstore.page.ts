import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { StatusbarService } from '../services/statusbar.service';

@Component({
  selector: 'app-tabstore',
  templateUrl: './tabstore.page.html',
  styleUrls: ['./tabstore.page.scss'],
})
export class TabstorePage implements OnInit {

  public headerBarPaddingTop = '0px';

  public isloading = false;

  //店铺信息
  public sid = '';
  public logo = '';
  public spic = '';
  public sn = '';
  public sm = '';

  public storeProList: any[] = [];

  constructor(
    private statusbarService: StatusbarService,
    public common: CommonService) {
  }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadData(null);
  }

  //load data from server
  loadData(event) {
    this.isloading = true;
    let api_url = this.common.wx_urlList.loadStoreInfo;
    this.common.post(api_url,{
    }).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        //store info
        this.sid = response.data.sid;
        this.logo = response.data.logo;
        this.spic = response.data.pic; console.log(this.spic);
        this.sn = response.data.merchname;
        this.sm = response.data.desc;
        //store list
        this.storeProList = response.data.slist;

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
}
