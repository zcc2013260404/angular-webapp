import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { CommonService } from '../services/common.service';
import { StorageService } from '../services/storage.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

declare let Aliplayer: any;
declare let ThumbsUpAni: any;
declare let window;

@Component({
  selector: 'app-viewlive',
  templateUrl: './viewlive.page.html',
  styleUrls: ['./viewlive.page.scss'],
  animations: [
    trigger('showChooseGoods', [
      state('up', style({
        bottom: '0rem'
      })),
      state('down', style({
        bottom: '-30rem'
      })),
      transition('up => down', [animate('0.3s')]),
      transition('down => up', [animate('0.3s')])
    ]),
    trigger('showShareType', [
      state('up', style({
        bottom: '0rem'
      })),
      state('down', style({
        bottom: '-23rem'
      })),
      transition('up => down', [animate('0.3s')]),
      transition('down => up', [animate('0.3s')])
    ]),
    trigger('showChooseType', [
      state('up', style({
        bottom: '0rem'
      })),
      state('down', style({
        bottom: '-45rem'
      })),
      transition('up => down', [animate('0.3s')]),
      transition('down => up', [animate('0.3s')])
    ]),
  ]
})
export class ViewlivePage implements OnInit {

  public userInfo = { "uid": '', "uname": '', "uphone": '', "salt": '' };// user info

  public showGoods = false;
  public sList: any[] = [];

  public showShare = false;

  public showTypebox = false;
  public vtype1 = '';
  public vtype2 = '';
  public gattr1 = '';
  public gattr2 = '';

  public mnum = 1;//购买数量

  public sccount = 0;//购物车数量

  public showFooter = true;//当输入时隐藏底部

  public thumbsUpAni = null;

  public player = null;

  public zid = '';//直播id
  public zurl = '';

  public websocket = null;

  public msg = '';//发送信息

  public msgList = [];//信息列表

  public showLivePoster = true;//是否显示封面（加载时或发生错误）
  public isloading = true;//加载中
  public showReplay = false;//重新播放
  public floadingsuccess = false;//首次加载是否成功
  public msgboxbottom = 0;//发送框底部
  public lpic = '../../assets/nologin.png';//头像
  public lscount = 1;//在线人数
  public lpcount = 0;//点赞数
  public lwxid = '';//微莕id
  public lqmval = 0;//亲密值
  public lkeep = 0;//是否关注0未关注1关注

  @ViewChild('msginput') msginput: any;
  @ViewChild('msgContent') msgcontent: ElementRef;
  @ViewChild('msgContentBox') msgContentBox: ElementRef;

  constructor(
    public platform: Platform,
    private keyboard: Keyboard,
    public common: CommonService,
    public store: StorageService,
    public navController: NavController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(data => {
      if (data) {
        this.zid = data.zid;
        this.zurl = data.zurl;
      }
    });

    for (var i = 1; i <= 6; i++) {
      this.sList.push({
        des: '推荐商品' + i,
        pic: 'assets/0' + i + '.jpg',
        inv: Math.round(Math.random() * 100),
        pri: Math.round(Math.random() * 100),
        prv: 0,
        url: '',
      })
    }
  }

  ngOnInit() {
    this.loadUserInfo();
    this.connectServer();
    //监听键盘
    this.keyboard.onKeyboardDidShow().subscribe((e) => {
      this.msgboxbottom = e.keyboardHeight + 25;
      this.showFooter = false;
    });
    this.keyboard.onKeyboardDidHide().subscribe((e) => {
      this.msgboxbottom = 0;
      this.showFooter = true;
    });
    //注册返回事件
    // this.platform.ready().then(() => {
    //   this.platform.backButton.subscribe(() => {
    //     alert(1);
    //     if (this.keyboard.isVisible) {
    //       this.msgboxbottom = 0;
    //       this.showFooter = true;
    //       this.keyboard.hide();
    //     }
    //     this.close();
    //   });
    // });
  }

  ngAfterViewInit() {
    this.initPlayer();
  }

  async ionViewWillLeave() {
    this.close();
  }

  initPlayer() {
    let ithis = this;
    $("#livePlayer").empty();
    new Promise((resove, reject) => {
      new Aliplayer({
        id: 'livePlayer',
        autoplay: false,
        preload: false,
        rePlay: false,
        isLive: true,
        height: "100%",
        width: "100%",
        playsinline: true,
        source: ithis.zurl,
        useH5Prism: true,
        useFlashPrism: false,
        skinLayout: false,
        x5_type: 'h5',
        x5_fullscreen: true,
        x5_orientation: 'landscape',
        x5LandscapeAsFullScreen: false
      }, function (player) {
        resove(player);
      });
    }).then(data => {
      this.player = data;
      $("#livePlayer video").attr('poster', '');
      this.player.on('error', function (err) {
        ithis.onPlayError(err);
      });
      this.player.on('ended', function () {
        ithis.onPlayEnded();
      });
      this.player.on('waiting', function () {
        ithis.isloading = true;
        ithis.showReplay = false;
      });
      this.player.on('playing', function () {
        ithis.showLivePoster = false;
        ithis.isloading = false;
        ithis.showReplay = false;
        ithis.floadingsuccess = true;
      });
      setTimeout(() => {
        this.player.play();
      }, 400);
    }).catch(() => {
      this.isloading = false;
      this.showReplay = true;
    });
  }

  //播放发生错误
  onPlayError(err) {
    console.log(err);
    this.showLivePoster = true;
    this.isloading = false;
    this.showReplay = true;
    // if (this.player) {
    //   this.player.dispose();
    //   this.player = null;
    // }
  }

  //播放完成
  onPlayEnded() {
    this.showLivePoster = true;
    this.isloading = false;
    this.showReplay = false;
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
  }

  //重新播放
  replay() {
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
    this.initPlayer();
  }

  //分享
  share() {
    if (!this.showShare) {
      this.showShare = true;
    }
  }

  closeShare() {
    if (this.showShare) {
      this.showShare = false;
    }
  }

  //点赞
  praise() {
    if (!this.thumbsUpAni) {
      this.thumbsUpAni = new ThumbsUpAni();
    }
    setTimeout(() => {
      this.thumbsUpAni.start();
      let msg = '{"zid":"' + this.zid + '","type":"3","uid":"' + this.userInfo.uid + '","uname":"' + this.userInfo.uname + '"}';
      this.websocket.send(msg);
    }, 300);
  }

  connectServer() {
    new Promise((resove, reject) => {
      let uid = '';
      if (this.userInfo) {
        uid = this.userInfo.uid;
      }
      if (!this.websocket) {
        let url = this.common.config.ws_host + ':' + this.common.config.ws_port + this.common.config.ws_path;
        this.websocket = new WebSocket("ws://" + url);
      }
      resove();
    }).then(() => {
      let obj = this;

      //0断开1上线2发送信息3点赞
      //连接服务器
      this.websocket.onopen = function (evt) {
        obj.onOpen(evt);
      };
      //判断连接
      this.websocket.onclose = function (evt) {
        obj.onClose(evt);
      };
      //当接收到信息时
      this.websocket.onmessage = function (evt) {
        obj.onMessage(evt);
      };
      //发生错误时
      this.websocket.onerror = function (evt) {
        obj.onError(evt);
      };
    });
  }
  //建立连接
  onOpen(evt) {
    //zid直播id,type类型0断开1上线2发送信息3点赞,uid看直播人id,uname看直播人昵称
    let msg = '{"zid":"' + this.zid + '","type":"1","uid":"' + this.userInfo.uid + '","uname":"' + this.userInfo.uname + '"}';
    this.websocket.send(msg);
  }

  //关闭连接
  onClose(evt) {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
      let msg = '{"zid":"' + this.zid + '","type":"0","uid":"' + this.userInfo.uid + '","uname":"' + this.userInfo.uname + '"}';
      this.websocket.send(msg);
    }
  }

  //接收信息
  onMessage(evt) {
    let sdata = evt.data;
    if (sdata) {
      let data = JSON.parse(sdata);
      let uid = data.uid;
      let type = data.type;
      if (type == "0") {
        //退出
      } else if (type == "1") {
        //上线
        let pic = data.pic;
        let scount = data.scount;
        let pcount = data.pcount;
        let wxid = data.wxid;
        let qmval = data.qmval;
        this.lpic = pic;
        this.lscount = scount;
        this.lpcount = pcount;
        if (uid == this.userInfo.uid) {
          //当前用户
          this.lwxid = wxid;
          this.lqmval = qmval;
        } else {
          //非当前用户
          let uname = data.uname;
          this.msgList.push({
            'uname': uname,
            'umsg': '来了'
          });
        }
      } else if (type == "2") {
        //发送信息
        if (uid != this.userInfo.uid) {
          //非当前用户
          let uname = data.uname;
          let msg = data.msg;
          this.msgList.push({
            'uname': uname,
            'umsg': msg
          });
          setTimeout(() => {
            this.msgcontent.nativeElement.scrollTop = this.msgContentBox.nativeElement.offsetHeight;
          }, 300);
        }
      } else if (type == "3") {
        //点赞
        let pcount = data.pcount;
        if (uid != this.userInfo.uid) {
          //非当前用户
          if (!this.thumbsUpAni) {
            this.thumbsUpAni = new ThumbsUpAni();
          }
          setTimeout(() => {
            this.thumbsUpAni.start();
          }, 300);
        }
        this.lpcount = pcount;
      } else if (type == "4") {
        //关注
        if (uid != this.userInfo.uid) {
          //非当前用户
          let uname = data.uname;
          this.msgList.push({
            'uname': uname,
            'umsg': '关注了主播'
          });
          setTimeout(() => {
            this.msgcontent.nativeElement.scrollTop = this.msgContentBox.nativeElement.offsetHeight;
          }, 300);
        }
      }
    }
  }

  //异常
  onError(evt) {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
      let msg = '{"zid":"' + this.zid + '","type":"0","uid":"' + this.userInfo.uid + '","uname":"' + this.userInfo.uname + '"}';
      this.websocket.send(msg);
    }
  }

  //显示发送框
  showSendBox() {
    setTimeout(() => {
      this.msginput.setFocus();
    }, 150);
    this.showFooter = false;
  }

  //发信息
  send() {
    let uname = '';
    if (this.userInfo) {
      uname = this.userInfo.uname;
      this.msgList.push({
        'uname': uname,
        'umsg': this.msg
      });
      this.showFooter = true;
      let msg = '{"zid":"' + this.zid + '","type":"2","uid":"' + this.userInfo.uid + '","uname":"' + this.userInfo.uname + '","msg":"' + this.msg + '"}';
      this.websocket.send(msg);
      this.msg = '';
      setTimeout(() => {
        this.msgcontent.nativeElement.scrollTop = this.msgContentBox.nativeElement.offsetHeight;
      }, 300);
    } else {
      this.navController.navigateForward('/login');
    }
  }

  //商品列表
  goGoods() {
    if (!this.showGoods) {
      this.showGoods = true;
    }
  }

  //关闭商口列表
  closeMask() {
    if (this.showGoods) {
      this.showGoods = false;
    }
    if (this.showShare) {
      this.showShare = false;
    }
    if (this.showTypebox) {
      this.showTypebox = false;
    }
  }

  //退出直播
  close() {
    this.isloading = false;
    this.showReplay = false;
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
    this.navController.back();
  }

  //关注主播
  keepZb() {
    this.lkeep = 1;
    let msg = '{"zid":"' + this.zid + '","type":"4","uid":"' + this.userInfo.uid + '","uname":"' + this.userInfo.uname + '"}';
    this.websocket.send(msg);
  }

  //添加购物车
  addGoods() {
    this.showGoods = false;
    this.showTypebox = true;
  }

  //用户信息
  loadUserInfo() {
    let uinfo = this.store.get('userInfo');
    if (uinfo) {
      this.userInfo = uinfo;
    } else {
      this.navController.navigateForward('/login');
    }
  }

  //分享微信好友
  shareWxFrind() {
    let cthis = this;
    window.Wechat.share({
      message: {
        thumb: 'http://' + this.common.config.ws_host + ':8080/live_zb/img2.jpg',
        media: {
          type: window.Wechat.Type.WEBPAGE,
          webpageUrl: 'www.ahhmtl.com'
        }
      },
      scene: window.Wechat.Scene.SESSION
    }, function () {
      cthis.closeShare();
    }, function (reason) {
      cthis.closeShare();
    });
  }

  //分享微信圈
  shareWxQ() {
    let cthis = this;
    window.Wechat.share({
      message: {
        thumb: 'http://' + this.common.config.ws_host + ':8080/live_zb/img2.jpg',
        media: {
          type: window.Wechat.Type.WEBPAGE,
          webpageUrl: 'www.ahhmtl.com'
        }
      },
      scene: window.Wechat.Scene.TIMELINE
    }, function () {
      cthis.closeShare();
    }, function (reason) {
      cthis.closeShare();
    });
  }

  selectAttr1(index, str) {
    this.vtype1 = '' + index;
    this.gattr1 = str;
  }

  selectAttr2(index, str) {
    this.vtype2 = '' + index;
    this.gattr2 = str;
  }

  //加入购物车
  addCart() {
    if (this.gattr1 == '' || this.gattr2 == '') {
      this.common.popToastView('请选择商品属性!');
    } else {
      this.sccount = 4;
      this.store.set('sccount', this.sccount);
      this.closeMask();
    }
  }

  //购买
  mail() {
    if (this.gattr1 == '' || this.gattr2 == '') {
      this.common.popToastView('请选择商品属性!');
    } else {
      this.navController.navigateForward('/ordercommit');
    }
  }

  //加数量
  addNum() {
    this.mnum = this.mnum + 1;
  }

  //减数量
  minusNum() {
    if (this.mnum > 1) {
      this.mnum = this.mnum - 1;
    }
  }

}