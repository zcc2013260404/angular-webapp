import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatusbarService } from '../services/statusbar.service';
import {StorageService} from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addgoods',
  templateUrl: './addgoods.page.html',
  styleUrls: ['./addgoods.page.scss'],
})
export class AddgoodsPage implements OnInit {

  public isloading = false;
  public userInfo: any; // user info
  public timediff = 0;
  public commodityData = []; //商品信息
  public selectGoodsIds = []
  public headerBarPaddingTop = '0px';

  public tid = "";
  public tname = "";

  public sList: any[] = [];

  public count = 0;

  public isLastPage = true;

  public isNoData = false;

  constructor(
    private statusbarService: StatusbarService,
    public common: CommonService,
    public store: StorageService,
    public navController: NavController,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.userInfo = this.store.get('userInfo');
    this.route.queryParams.subscribe((data) => {
      this.tid = data.tid;
      this.tname = data.tname;
    });
    this.loadTimediff();
    this.loadData("");
  }

  loadData(selectInfo) {
    // selectInfo 为搜索信息
    this.isloading = true;
    const uid = this.userInfo.uid;
    if (uid) {
      // 时间差
      const timedifflong = this.timediff;
      const stime = new Date().getTime() + timedifflong;
      const sign = this.common.sign({
        uid: uid,
        stime: stime,
        keywords: selectInfo,
        salt: this.userInfo.salt// 私钥
      }); // 签名
      const param = {
        uid: uid,
        stime: stime,
        keywords: selectInfo,
        sign: sign,
      };
      // tslint:disable-next-line:variable-name
      const api_url = this.common.wx_urlList.getLiveCommodity;
      this.common.post(api_url, param).then((response: any) => {
        const code = response.code;
        if (code == 'success') {
          this.commodityData = response.data;
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
  loadTimediff() {
    this.timediff = this.common.changeStr(this.store.get('timedifflong'), '0');
  }
  handleAddgoods(item){
      this.selectGoodsIds.push(item.id)
      this.selectGoodsIds = Array.from(new Set(this.selectGoodsIds))
      this.count=this.selectGoodsIds.length
      console.log("已添加：",JSON.stringify(this.selectGoodsIds),111111);
      
  }
  goonlive(){
    // this.navController.navigateForward(['/createlive'],{
    //   queryParams:{
    //       returnUrl:'/cart'
    //   }
    //   )
    // this.goBack();

    this.store.set("goodIdList", this.selectGoodsIds);
    this.goBack();
//     this.navController.navigateForward(['/createlive'],{
//       queryParams:{
//           goodIdList:this.selectGoodsIds
//       }
// });

    }
  searchTypeInfo(id) {
    // this.lCateSelId = id;
    // this.isloading = true;
    // let api_url = this.common.wx_urlList.loadGoodsTypeInfo;
    // this.common.post(api_url,{'tid':id}).then((response: any) => {
    //   let code = response.code;
    //   if (code == 'success') {
    //     this.rCateList = response.data;//type right
    //   } else {
    //     this.common.popToastView(response.msg);
    //   }
    //   this.isloading = false;
    // }).catch(() => {
    //   this.isloading = false;
    //   this.common.popToastView('网络异常!');
    // });
  }
  goBack() {
    this.navController.back();
  }

  goGoodInfo() {
    this.navController.navigateForward('/goodinfo');
  }

}
