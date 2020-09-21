import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { StatusbarService } from '../services/statusbar.service';

@Component({
  selector: 'app-goodstype',
  templateUrl: './goodstype.page.html',
  styleUrls: ['./goodstype.page.scss'],
})
export class GoodstypePage implements OnInit {

  public headerBarPaddingTop = '0px';

  public isloading = false;
  //左侧分类
  public lCateList: any[] = [];
  public lCateSelId: any = 't0';
  //右侧详情
  public rCateList: any[] = [];

  constructor(
    private statusbarService: StatusbarService,
    public navController: NavController,
    public store: StorageService,
    public common: CommonService) {

  }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadTypeData();
  }

  //load data from server
  loadTypeData() {
    this.isloading = true;
    let api_url = this.common.wx_urlList.loadGoodsTypes;
    this.common.get(api_url).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        this.lCateList = response.data;//type left
        //load first type right
        if (this.lCateList.length > 0) {
          this.lCateSelId = this.lCateList[0].id;
          this.searchTypeInfo(this.lCateSelId);
        }
      } else {
        this.isloading = false;
        this.common.popToastView('网络异常!');
      }
    }).catch(() => {
      this.isloading = false;
      this.common.popToastView('网络异常!');
    });
  }

  searchTypeInfo(id) {
    this.lCateSelId = id;
    this.isloading = true;
    let api_url = this.common.wx_urlList.loadGoodsTypeInfo;
    this.common.post(api_url,{'tid':id}).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        this.rCateList = response.data;//type right
      } else {
        this.common.popToastView(response.msg);
      }
      this.isloading = false;
    }).catch(() => {
      this.isloading = false;
      this.common.popToastView('网络异常!');
    });
  }

  goBack() {
    this.navController.back();
  }

  goSearch() {
    this.navController.navigateForward(['/search'], {
      queryParams: {
        'stype': 'goods'
      }
    });
  }

}
