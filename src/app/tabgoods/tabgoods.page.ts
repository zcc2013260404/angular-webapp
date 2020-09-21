import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { EventService } from '../services/event.service';
import { StatusbarService } from '../services/statusbar.service';

@Component({
  selector: 'app-tabgoods',
  templateUrl: './tabgoods.page.html',
  styleUrls: ['./tabgoods.page.scss']
})
export class TabgoodsPage implements OnInit {

  @ViewChild('gpicslide') gpicslide: any;

  public headerBarPaddingTop = '0px';

  public isloading = false;

  public slidesList: any[] = [];//轮播图
  public typesList: any[] = [];//推荐类型

  //优质推荐
  public yztjList: any[] = [];
  public yztjListWidth: any = 400;

  public ghour = '00';
  public gshour = 0;
  public gsminute = 0;
  public gssecond = 0;
  public timer = null;

  //限时特卖
  public xstmList: any[] = [];

  //购物车数量
  public sccount = 0;

  //轮播图的属性
  public slidesOpts = {
    pager: true,
    speed: 400,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  }

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    public statusbarService: StatusbarService,
    public navController: NavController,
    public store: StorageService,
    public common: CommonService,
    public eventService: EventService) {
  }

  ngOnInit() {
    this.initStatusBar();
    this.loadCartCount();
    this.loadData(null);
  }

  ionViewDidLeave() {
    if (this.gpicslide) {
      this.gpicslide.stopAutoplay();
    }
  }

  initStatusBar() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.statusbarService.setPlatform('android');
      } else {
        this.statusbarService.setPlatform('ios');
      }
      this.statusbarService.setHeaderBarPaddingTop();
      this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
      this.statusbarService.initStatusBar(this.statusBar);
    });
  }

  //load data from server
  loadData(event) {
    this.isloading = true;
    let api_url = this.common.wx_urlList.loadGoodsInfo;
    this.common.post(api_url, {}).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        //轮播图片
        let sdata = response.data.alist;
        if (sdata && sdata.length > 0) {
          this.slidesList = [];
          sdata.forEach(element => {
            this.slidesList.push({
              'id': element.id,
              'pic': element.thumb,
              'link': element.link
            });
          });
        }

        console.log("index_slidesList: "+JSON.stringify(this.slidesList));
        //推荐类型
        let gdata = response.data.nlist;
        if (gdata && gdata.length > 0) {
          this.typesList = [];
          gdata.forEach(element => {
            this.typesList.push({
              'gtid': element.id,
              'gtname': element.navname,
              'pic': element.icon
            });
          });
        }
        //优质推荐
        let ydata = response.data.relist;
        if (ydata && ydata.length > 0) {
          this.yztjList = [];
          ydata.forEach(element => {
            this.yztjList.push({
              'gid': element.id,
              'gn': element.title,
              'pic': element.thumb,
              'gp': element.marketprice
            });
          });
        }
        //限时特卖
        let tdata = response.data.slist;
        if (tdata) {
          this.ghour = this.common.changeStr(tdata.time, '00');
          this.gshour = this.common.changeStr(tdata.hour, '0') - 0;
          this.gshour = this.gshour < 0 ? 0 : this.gshour;
          this.gsminute = this.common.changeStr(tdata.min, '0') - 0;
          this.gssecond = this.common.changeStr(tdata.second, '0') - 0;
          let xdata = tdata.goods;
          if (xdata && xdata.length > 0) {
            this.xstmList = [];
            xdata.forEach(element => {
              this.xstmList.push({
                'gid': element.id,
                'gm': element.title,
                'pic': element.thumb,
                'gk': element.total,
                'gb': element.percent,
                'nowp': element.price,
                'gp': element.marketprice
              });
            });
          }
        }
        //计算优质推荐的宽度
        this.yztjListWidth = this.yztjList.length * 13 + 'rem';
        if (event) {
          event.target.complete();
        }
        //到计时
        this.doTimer();
        this.isloading = false;
      } else {
        if (event) {
          event.target.complete();
        }
        this.isloading = false;
        this.common.popToastView('网络异常!');
      }
    }).catch((e) => {
      if (event) {
        event.target.complete();
      }
      this.isloading = false;
      this.common.popToastView('网络异常!');
    });
  }

  //load shopping cart count
  loadCartCount() {
    let ct = this.store.get('sccount');
    if (ct) {
      this.sccount = ct;
    }
  }

  //商品类型
  goType() {
    this.navController.navigateForward('/goodstype');
  }

  //购物车
  goCart() {
    this.navController.navigateForward('/shoppingcart');
  }

  //搜索
  goSearch() {
    this.navController.navigateForward(['/search'], {
      queryParams: {
        'stype': 'goods'
      }
    });
  }

  //手动滑动完成
  slideTouchEnd() {
    this.gpicslide.startAutoplay();
  }

  //特卖全部
  viewAll() {
    this.navController.navigateForward('/goodtmlist');
  }

  //倒计时
  doTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.timer = setInterval(() => {
      if (this.gshour == 0 && this.gsminute == 0 && this.gssecond == 0) {
        clearInterval(this.timer);
      } else {
        if (this.gssecond > 0) {
          this.gssecond--;
        } else {
          if (this.gsminute > 0) {
            this.gssecond = 59;
            this.gsminute--;
          } else {
            if (this.gshour > 0) {
              this.gsminute = 59;
              this.gssecond = 59;
              this.gshour--;
            }
          }
        }
      }
    }, 1000)
  }

  //分类详情
  goTypeList(tid, tname) {
    this.navController.navigateForward(['/goodtypelist'], {
      queryParams: {
        'tid': tid,
        'tname': tname,
      }
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
