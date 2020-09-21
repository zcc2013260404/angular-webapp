import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatusbarService } from '../services/statusbar.service';
import { CommonService } from '../services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-goodtypelist',
  templateUrl: './goodtypelist.page.html',
  styleUrls: ['./goodtypelist.page.scss'],
})
export class GoodtypelistPage implements OnInit {

  public isloading = false;

  public headerBarPaddingTop = '0px';

  public tid = "";
  public tname = "";

  public sList: any[] = [];

  public pn = 0;

  public isLastPage = true;

  public isNoData = false;

  constructor(
    private statusbarService: StatusbarService,
    public common: CommonService,
    public navController: NavController,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.route.queryParams.subscribe((data) => {
      this.tid = data.tid;
      this.tname = data.tname;
    });
    this.loadData(null);
  }

  loadData(event) {
    this.isloading = true;
    this.pn++;
    let api_url = this.common.wx_urlList.loadGoodsRecTypeList;
    this.common.post(api_url, { 'tid': this.tid, 'page': this.pn }).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        let rdata = response.data.list;
        if (rdata.length > 0) {
          this.isLastPage = false;
          this.isNoData = false;
          this.sList = this.sList.concat(rdata);
        } else {
          if (this.pn > 1) {
            this.isLastPage = true;
            this.isNoData = true;
          } else {
            this.isNoData = false;
          }
        }
      } else {
        this.common.popToastView('网络异常!');
      }
      if (event) {
        event.target.complete();
      }
      this.isloading = false;
    }).catch(() => {
      if (event) {
        event.target.complete();
      }
      this.isloading = false;
      this.common.popToastView('网络异常!');
    });
  }

  goBack() {
    this.navController.back();
  }

  goGoodInfo() {
    this.navController.navigateForward('/goodinfo');
  }

}
