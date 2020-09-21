import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { EventService } from '../services/event.service';
import { Router, NavigationExtras } from '@angular/router';
import { StatusbarService } from '../services/statusbar.service';

@Component({
  selector: 'app-tablive',
  templateUrl: './tablive.page.html',
  styleUrls: ['./tablive.page.scss']
})
export class TablivePage implements OnInit {

  @ViewChild('lpicslide') lpicslide: any;

  public headerBarPaddingTop = '0px';

  public isloading = false;
  public slidesList: any[] = [];
  //直播预告
  public liveAdvanceList: any[] = [];
  public liveAdvanceListWidth: any = 400;

  //直播分类
  public liveTypeList: any[] = [];
  public liveTypeListWidth: any = 400;

  public userInfo = { "uid": '', "uname": '', "uphone": '', "salt": '' };// user info

  public liveList = [];

  //轮播图的属性
  public slidesOpts = {
    pager: true,
    speed: 400,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  }

  //购物车数量
  public sccount = 0;

  //选中的直播类型
  public activeLiveType = 0;

  public pn = 0;

  public isLastPage = true;

  constructor(
    private statusbarService: StatusbarService,
    public navController: NavController,
    public store: StorageService,
    public common: CommonService,
    public eventService: EventService,
    private router: Router) {
  }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadUserInfo();
    this.loadCartCount();
    this.loadData(null);
    //监听登录后信息
    this.eventService.event.on("userLogined", () => {
      this.loadUserInfo();
    });
  }

  ionViewDidEnter() {
    if (this.lpicslide) {
      this.lpicslide.autoplayDisableOnInteraction = false;
      this.lpicslide.startAutoplay();
    }
  }

  ionViewDidLeave() {
    if (this.lpicslide) {
      this.lpicslide.stopAutoplay();
    }
  }
  //load data from server
  loadData(event) {
    this.loadLiveInfo(event);
    // this.loadLiveData(null);
  }

  loadLiveInfo(event) {
    this.isloading = true;
    let api_url = this.common.wx_urlList.loadLiveInfo;
    this.common.get(api_url).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        let slidesData = response.data.advs;//slide pic
        if (slidesData && slidesData.length > 0) {
          this.slidesList = [];
          slidesData.forEach(element => {
            this.slidesList.push({
              'id': element.thumb,
              'type': element.type,
              'val': element.val,
              'pic': element.thumb
            });
          });
        } else {
          this.slidesList = [];
        }
        let lvredata = response.data.lives;//lvredata
        if (lvredata && lvredata.length > 0) {
          this.liveAdvanceList = [];
          lvredata.forEach(element => {

            this.liveAdvanceList.push({
              'id': element.id,
              'rm': element.title,
              'pic': element.thumb,
              'rt': element.livetime
            });
          });
        } else {
          this.liveAdvanceList = [];
        }
        let categorys = response.data.categorys;//lvtydata
        if (categorys && categorys.length > 0) {
          let index = 0;
          this.liveTypeList = [];

          categorys.forEach(element => {
            this.liveTypeList.push({
              'ltid': element.id,
              'ltname': element.name
            });
            console.log("category:   "+index);
            if (index == 0) {
              this.activeLiveType = element.id;
              console.log("activeLiveType: "+this.activeLiveType);
            }
            index++;



          });
        }
        //计算直播预告的宽度
        this.liveAdvanceListWidth = this.liveAdvanceList.length * 13 + 'rem';
        //计算直播的宽度
        this.liveTypeListWidth = this.liveTypeList.length * 5 + 'rem';
        if (event) {
          event.target.complete();
        }
        this.isloading = false;

        this.loadLiveData(null);

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

  //load shopping cart count
  loadCartCount() {
    let ct = this.store.get('sccount');
    if (ct) {
      this.sccount = ct;
    }
  }


  //获取用户信息
  loadUserInfo() {
    this.userInfo = this.store.get('userInfo');
  }

  //手动滑动完成
  slideTouchEnd() {
    this.lpicslide.startAutoplay();
  }

  //购物车
  goCart() {
    this.navController.navigateForward('/shoppingcart');
  }

  //搜索
  goSearch() {
    this.navController.navigateForward(['/search'], {
      queryParams: {
        'stype': 'live'
      }
    });
  }

  //消息中心
  goMessage() {
    this.navController.navigateForward('/message');
  }

  //直播列表
  loadLiveData(event) {
    this.pn++;
    this.isloading = true;
    let api_url = this.common.wx_urlList.loadLiveList;
    let param = {
      'tid': this.activeLiveType,
      'page': this.pn
    };
    this.common.post(api_url, param).then((response: any) => {
      let code = response.code;

      console.log("loadLiveList:"+JSON.stringify(response));

      if (code == 'success') {
        var rdata = response.data;
        if (rdata && rdata.length > 0) {
          this.liveList = [];
          this.isLastPage = false;
          rdata.forEach(element => {
            this.liveList = this.liveList.concat({
              'lid': element.id,
              'ltitle': element.title,
              'zcount': 0,
              'vcount': 0,
              'lname': '',
              'lpic': element.thumb,
              'rpic': '',
              'url': element.video
            });
          });
          console.log("load list: "+JSON.stringify(this.liveList));
        } else {
          if (this.pn > 1) {
            this.isLastPage = true;
          }
        }
        if (event) {
          event.target.complete();
        }
        this.isloading = false;
      } else {
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

  //去看直播
  golive(zid, url) {
    if (this.userInfo) {
      let navigationExtras: NavigationExtras = {
        queryParams: { 'zid': zid, 'zurl': url }
      };
      this.router.navigate(['/viewlive'], navigationExtras);
    } else {
      this.goLogin();
    }
  }

  //切换直播类型
  switchLiveType(ltid) {

    this.liveList = [];

    this.activeLiveType = ltid;
    this.pn = 0;
    this.isLastPage = false;
    this.loadLiveData(null);
  }

  //预约直播
  subs() {
    this.navController.navigateForward('/subscribelive');
  }

  //登录
  goLogin() {
    this.navController.navigateForward('/login');
  }
}
