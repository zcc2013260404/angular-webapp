import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NavController, IonContent, } from '@ionic/angular';
import { StatusbarService } from '../services/statusbar.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-goodinfo',
  templateUrl: './goodinfo.page.html',
  styleUrls: ['./goodinfo.page.scss'],
  animations: [
    trigger('showChooseType', [
      state('up', style({
        bottom: '0rem'
      })),
      state('down', style({
        bottom: '-45rem'
      })),
      transition('up => down', [animate('0.3s')]),
      transition('down => up', [animate('0.3s')])
    ])
  ]
})
export class GoodinfoPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public activeTab = 'main';

  public sheight = 220;

  public vtype = '';

  public mnum = 1; // 购买数量

  public sccount = 0; // 购物车数量

  @ViewChild('goodPicSlide') goodPicSlide: any;
  @ViewChild('goodsplit') goodsplit: ElementRef;
  @ViewChild(IonContent) content: IonContent;
  // 轮播图的属性
  public slidesOpts = {
    pager: true,
    speed: 400,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  };

  public showTypebox = false;

  public userInfo: any; // user info

  public carInfo: any;

  public timediff = 0;

  public gid = '';

  public data: any = {};

  public attrData = [];
  public optionData = [];
  public options = '';


  public sthumb = ''; // 选中属性商品图标

  constructor(
    private statusbarService: StatusbarService,
    public navController: NavController,
    public common: CommonService,
    public store: StorageService,
    public route: ActivatedRoute) {
    this.route.queryParams.subscribe((data) => {
      this.gid = data.id;
    });
  }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.sheight = screen.availWidth;
    this.loadUserInfo();
    this.loadTimediff();
    this.loadData();
    this.getTickerInfo();
    if(this.userInfo){
      this.getCarInfo(this.userInfo.uid, this.userInfo.salt);
    }
  }

  ionViewDidEnter() {
    if (this.goodPicSlide) {
      this.goodPicSlide.autoplayDisableOnInteraction = false;
      this.goodPicSlide.startAutoplay();
    }
  }

  ionViewDidLeave() {
    if (this.goodPicSlide) {
      this.goodPicSlide.stopAutoplay();
    }
  }

  loadData() {
    // if (this.userInfo) {
    //   let uid = this.userInfo.uid;
    //   //时间差
    //   let timedifflong = this.timediff;
    //   let stime = (new Date().getTime() + timedifflong) + '';
    //   let sign = this.common.sign({
    //     'gid': this.gid,
    //     'uid': uid,
    //     'stime': stime,
    //     'salt': this.userInfo.salt//私钥
    //   });//签名
    //   let param = {
    //     'gid': this.gid,
    //     'uid': uid,
    //     'sign': sign,
    //     'stime': stime
    //   };
    const api_url = this.common.wx_urlList.loadGoodInfo;
    this.common.post(api_url, {
      gid: this.gid
    }).then((response: any) => {
      const code = response.code;
      if (code == 'success') {
        const rdata = response.data;
        if (rdata) {
          this.data = {
            slidepic: rdata.thumbs,
            title: rdata.title,
            subtitle: rdata.subtitle,
            thumb: rdata.thumb,
            opri: rdata.productprice,
            npri: rdata.marketprice,
            stotal: rdata.sales,
            ktotal: rdata.total,
            ginfo: rdata.content,
            merchsale: rdata.merchsale,
            spec_titles: rdata.spec_titles,
            hasattr: true
            // hasattr: rdata.spec_titles == '' ? false : true
          };
          this.sthumb = rdata.thumb;
        }
      } else {
        this.common.popToastView(response.msg);
      }
    }).catch((e) => {
      this.common.popToastView('网络异常!');
    });
  }

  // 手动滑动完成
  slideTouchEnd() {
    this.goodPicSlide.startAutoplay();
  }

  getTickerInfo(){
    if (this.userInfo) {
      const uid = this.userInfo.uid;
      // 时间差
      const timedifflong = this.timediff;
      const stime = (new Date().getTime() + timedifflong) + '';
      const sign = this.common.sign({
        gid: this.gid,
        uid: uid,
        stime: stime,
        salt: this.userInfo.salt// 私钥
      }); // 签名
      const param = {
        gid: this.gid,
        uid: uid,
        sign: sign,
        stime: stime
      };
      const api_url = this.common.wx_urlList.loadGoodAttr;
      this.common.post(api_url, param).then((response: any) => {
        const code = response.code;
        if (code == 'success') {
          const rdata = response.data.specs;
          if (rdata) {

            let ritems = [];
            rdata.forEach(element => {
              const items = [];
              ritems = element.items;
              ritems.forEach(element2 => {
                items.push({
                  xid: element2.id,
                  title: element2.title,
                  thumb: element2.thumb,
                  checked: false
                });
              });
              this.attrData.push({
                fid: element.id,
                title: element.title,
                items: items
              });
            });
          }
          this.optionData = response.data.options;
        } else {
          this.common.popToastView('网络异常!');
        }
      }).catch((e) => {
        this.common.popToastView('网络异常!');
      });
    }
  }


  chooseType() {
    if (!this.showTypebox) {
      this.showTypebox = true;
    }
  }

  closeChooseType() {
    if (this.showTypebox) {
      this.showTypebox = false;
    }
  }

  closeChooseType2(e) {
    e.preventDefault();
    if (this.showTypebox) {
      this.showTypebox = false;
    }
  }

  goodsTabSwitch(type) {
    if (type == 0) {
      // main info goodsBody
      this.content.scrollToPoint(0, 0, 500);
    } else if (type == 1) {
      // other info
      this.content.scrollToPoint(0, this.goodsplit.nativeElement.offsetTop, 500);
    }
  }

  onContentScrolling(event) {
    // event.detail.scrollTop
    if (event.srcElement.clientHeight + event.detail.scrollTop - this.goodsplit.nativeElement.offsetTop > 10) {
      this.activeTab = 'info';
    } else {
      this.activeTab = 'main';
    }
  }

  loadUserInfo() {
    this.userInfo = this.store.get('userInfo');
  }

  loadTimediff() {
    this.timediff = this.common.changeStr(this.store.get('timedifflong'), '0');
  }

  goBack() {
    this.navController.back();
  }

  selectAttr(fid, xid) {
    let rdata = [], items = [];
    let checked = false;
    this.attrData.forEach(element1 => {
      items = [];
      if (element1.items) {
        element1.items.forEach(element2 => {
          checked = element2.checked;
          if (element1.fid == fid) {
            if (element2.xid == xid) {
              checked = true;
              if (element2.thumb) {
                this.sthumb = element2.thumb;
              }
            } else {
              checked = false;
            }
          }
          items.push({
            xid: element2.xid,
            title: element2.title,
            thumb: element2.thumb,
            checked: checked
          });
        });
      }
      rdata.push({
        fid: element1.fid,
        title: element1.title,
        items: items
      });
    });
    this.attrData = rdata;

    console.log(this.attrData);
    this.getGoodsChooseAttrs();
  }

  // 加载选中的商品属性
  getGoodsChooseAttrs() {
    let rdata = [];
    let sflag = false;
    let fid = '', ftitle = '', xid = '', xtitle = '', thumb = '';

    let options = '';

    this.attrData.forEach(element1 => {
      sflag = false;
      fid = element1.fid;
      ftitle = element1.title;
      xid = '';
      xtitle = '';
      thumb = '';
      if (element1.items) {
        element1.items.forEach(element2 => {
          if (element2.checked) {
            options = options + '_' + element2.xid;
            sflag = true;
            xid = element2.xid;
            xtitle = element2.xtitle;
            thumb = element2.thumb;
            return false;
          }
        });
      }
      if (sflag) {
        rdata.push({
          fid: fid, // 属性大类id
          ftitle: ftitle, // 属性大类标题
          xid: xid, // 属性小类id
          xtitle: xtitle, // 属性小类标题
          thumb: thumb// 属性图片
        });
      } else {
        rdata = [];
        return false;
      }
    });
    this.optionData.forEach(element1 => {
        if (options.search(element1.specs) != -1 ){
          this.options = element1.id;
          this.data.npri = element1.marketprice;
        }
    });
    return rdata;
  }
  getCarInfo(uid,salt){
    let timediff = 0;
    //时间差
    let timedifflong = timediff;
    let stime = (new Date().getTime() + timedifflong) + '';
    let sign = this.common.sign({
      'uid': uid,
      'stime': stime,
      'salt': salt//私钥
    });//签名
    let param = {
      'uid': uid,
      'sign': sign,
      'stime': stime
    };
    let api_url = this.common.wx_urlList.loadMyGoodsCarts;
    this.common.post(api_url, param).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        let rdata = response.data;
        if (rdata) {
          let gdata = rdata.merch_list;
          if (gdata) {
            this.loadCartCount(gdata);
          }
        } else {
          this.common.popToastView('获取购物车信息异常!');
        }
      }
    }).catch((e) => {
      this.common.popToastView('获取购物车信息异常!');
    });
  }


  addCart() {
    if (this.mnum > this.data.ktotal){
      this.common.popToastView('库存不足');
    }else {
      const sdata = this.getGoodsChooseAttrs();
      const gid = this.gid;
      const total = this.mnum;
      const merchsale = this.data.merchsale;
      if (this.data.hasattr) {
        // if (sdata && sdata.length > 0) {
          const api_url = this.common.wx_urlList.addCar;
          const timedifflong = this.timediff;
          const stime = new Date().getTime() + timedifflong;
          const uid = this.userInfo.uid;

          const sign = this.common.sign({
            uid,
            gid,
            stime,
            merchid: merchsale,
            total,
            optionid: this.options,
            price: this.data.npri * total,
            salt: this.userInfo.salt// 私钥
          }); // 签名
          const param = {
            uid,
            gid,
            stime,
            merchid: merchsale,
            total,
            optionid: this.options,
            price: this.data.npri * total,
            sign,
          };

          this.common.post(api_url, param).then((response: any) => {


            const code = response.code;
            if (code == 'success') {
              // this.goBack();
              this.closeChooseType();
              this.navController.navigateForward('/shoppingcart');
            } else
            if (code == 'fail') {
              this.common.popToastView(response.msg);
            }
          }).catch((e) => {console.log(e);
                           this.common.popToastView('网络异常!');
          });

        // } else {
        //   this.common.popToastView('请选择商品属性!');
        // }
      }
    }
    this.loadUserInfo();
  }

  // 购买
  mail() {
    const sdata = this.getGoodsChooseAttrs();
    console.log(sdata);
    console.log(this.options);
    if (this.options.length>0) {
      if (sdata && sdata.length > 0) {
        this.closeChooseType();
        this.navController.navigateForward('/ordercommit',{queryParams:{type:"shop",isCar:0,gid:this.gid,optionid:this.options,total:this.mnum}});
      } else {
        this.common.popToastView('请选择商品属性!');
      }
    }else {
      this.closeChooseType();
      this.navController.navigateForward('/ordercommit',{queryParams:{type:"shop",isCar:0,gid:this.gid,optionid:this.options,total:this.mnum}});
    }
  }

  // 加数量
  addNum() {
    this.mnum = this.mnum + 1;
  }

  // 减数量
  minusNum() {
    if (this.mnum > 1) {
      this.mnum = this.mnum - 1;
    }
  }

  // 立即购买
  buy() {
    this.chooseType();
    // const sdata = this.getGoodsChooseAttrs();
    // if (this.options.length>1) {
    //   if (sdata && sdata.length > 1) {
    //     this.showTypebox = false;
    //     this.navController.navigateForward('/ordercommit',{queryParams:{isCar:1}});
    //   } else {
    //     this.chooseType();
    //   }
    // } else {
    //   this.navController.navigateForward('/ordercommit',{queryParams:{isCar:1}});
    // }
  }

  // 客服
  goService() {
    this.common.popToastView('网络异常!');
  }


  loadCartCount(carinfo) {
    let num = 0;
    let slist = [];
    carinfo.forEach(element => {
      slist = element.list;
      slist.forEach(element2 => {
        num ++;
      });
    });
    this.sccount = num;
  }


   count(o){
    const t = typeof o;
     // tslint:disable-next-line:triple-equals
    if (t == 'string'){
      return o.length;
    }else if(t == 'object'){
      var n = 0;
      for(var i in o){
        n++;
      }
      return n;
    }
    return false;
  }
}
