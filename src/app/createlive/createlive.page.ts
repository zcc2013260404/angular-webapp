import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import {  ActivatedRoute, Params } from '@angular/router';
import {CommonService} from '../services/common.service';
import {StorageService} from '../services/storage.service';
import {EventService} from '../services/event.service';

declare let Wxlive: any;

@Component({
  selector: 'app-createlive',
  templateUrl: './createlive.page.html',
  styleUrls: ['./createlive.page.scss'],
})
export class CreatelivePage implements OnInit {


  public isloading = false;

  public userInfo: any; // user info
  public isLogined = false; // 是否登录
  public udata: any = {}; // 用户登录信息
  public timediff = 0;
  public commodityData = []; //商品信息
  /**
   * 商品信息格式如下所示：
   * [
   * {"id":"49",
   * "thumb":"https:\/\/weixing.ahhmtl.com\/attachment\/images\/2\/merch\/1\/JkFWgy96jSJf9FVes5ckJWovOWAVZy.jpg",
   * "productprice":"85.00",
   * "marketprice":"65.00",
   * "total":"47",
   * "title":"\u6211\u662f\u5546\u5bb6\u5546\u54c1"}
   * ]
   */

  public czCheck = true;
  public cyCheck = false;
  public ctxt = '创建直播';
  public cbtxt = '开始直播';
  public cbtnFlag = false;
  public ltypeData = [];
  public ltypeid = '';
  public ltypetxt = '';
  public llxid = '';
  public llxtxt = '';
  public fileToUpload: File = null;
  public liveImg = 'assets/nologin.png';
  public childparam = [];

  public liveTitle = '';
  public liveDesc = '';
  public uploadImg = '';
  public openLiveTime = '';

  constructor(
    public navController: NavController,
    public common: CommonService,
    public store: StorageService,
    public eventService: EventService,
    public activeRoute: ActivatedRoute,
    public actionSheetController: ActionSheetController){
    let ithis = this;
    this.activeRoute.queryParams.subscribe((params: Params) => {

      this.loadGoods();
    });
    this.ltypeData = [{
      text: '穿搭',
      handler: () => {
        ithis.selectLiveType('1', '穿搭');
      }
    }, {
      text: '美食',
      handler: () => {
        ithis.selectLiveType('2', '美食');
      }
    }, {
      text: '美妆',
      handler: () => {
        ithis.selectLiveType('3', '美妆');
      }
    }, {
      text: '百货',
      handler: () => {
        ithis.selectLiveType('4', '百货');
      }
    }, {
      text: '其他',
      handler: () => {
        ithis.selectLiveType('5', '其他');
      }
    }, {
      text: '珠宝',
      handler: () => {
        ithis.selectLiveType('6', '珠宝');
      }
    }, {
      text: '教育',
      handler: () => {
        ithis.selectLiveType('7', '教育');
      }
    }];
  }

  ngOnInit() {
    this.loadUserInfo();
    this.loadTimediff();
    // this.getCommodityData("");
  }

  loadGoods(){

    this.childparam = this.store.get('goodIdList');
    console.log("goodIdList:",this.childparam);
  }

  checkType(flag) {
    if (flag == 0) {
      this.czCheck = true;
      this.cyCheck = false;
      this.ctxt = '创建直播';
    } else if (flag == 1) {
      this.czCheck = false;
      this.cyCheck = true;
      this.ctxt = '创建预告';
    }
    this.check();//验证
  }

  selectLiveType(tid, tname) {
    this.ltypeid = tid;
    this.ltypetxt = tname;
    this.check();//验证
  }
  changeDate(){
       console.log(this.openLiveTime,new Date(this.openLiveTime).getTime(),2221);
       
  }
  //直播分类
  async showTypeAction() {
    let ithis = this;
    const actionSheet = await this.actionSheetController.create({
      header: '直播分类',
      mode: 'md',
      buttons: ithis.ltypeData
    });
    await actionSheet.present();
  }
  //添加商品
  async addGoods(){
    this.navController.navigateForward('/addgoods');
  }
  //直播类型
  async showLxAction() {
    let ithis = this;
    const actionSheet = await this.actionSheetController.create({
      header: '直播设置',
      mode: 'md',
      buttons: [{
        text: '正式直播(展示在直播列表)',
        handler: () => {
          ithis.selectLiveLx('0', '正式直播 (展示在直播列表)');
        }
      }, {
        text: '试播(不展示在直播列表)',
        handler: () => {
          ithis.selectLiveLx('1', '试播 (不展示在直播列表)');
        }
      }]
    });
    await actionSheet.present();
  }

  selectLiveLx(lflag, ltxt) {
    this.llxid = lflag;
    this.llxtxt = ltxt;
    this.check();//验证
  }

  //判断是否填写完成
  check() {
    if ((this.czCheck || this.cyCheck) && this.liveTitle != '' && this.ltypeid != '' && this.llxid != '') {
      this.cbtnFlag = true;
    } else {
      this.cbtnFlag = false;
    }
  }

  handleFileInput(files: FileList){

    this.fileToUpload = files.item(0);
    let cthis = this;
    const api_url = this.common.wx_urlList.uploadFile;
    console.log(api_url);
    this.common.postFile(api_url, this.fileToUpload).then((response: any) => {
      const code = response.status; console.log(JSON.stringify(response));
      if (code == 'success') {
        cthis.liveImg = response.url;
        cthis.uploadImg = response.filename;
      } else {
        this.common.popToastView(response.msg);
      }
      this.isloading = false;
    }).catch((e) => {
      console.log(e);
      this.isloading = false;
      this.common.popToastView('网络异常!');
    });
  }

  getCommodityData(selectInfo) {
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

  //开始直播
  startLive() {
    if (this.cbtnFlag) {
      this.getLoginedData();
    }
  }


  getLoginedData() {
    this.isloading = true;
    const uid = this.userInfo.uid;
    if (uid) {
      //判断直播类型
      let liveType = 1;
      if (this.czCheck == true){
        liveType = 0;
      }
      //判断直播性质
      let liveStatus = 0;
      if (this.llxid == "0"){
        liveStatus = 1;
      }
      //判断 分类id
      let livecid = this.ltypeid;

      let goodids = "";
      if (this.childparam !=null){
        if (this.childparam.length >0){
          goodids = this.childparam.join(",");
        }
      }
      // 时间差
      const timedifflong = this.timediff;
      const stime = new Date().getTime() + timedifflong;

      let liveTime = 0;
      if (liveType ==1){
        if (this.openLiveTime!=""){
          liveTime = new Date(this.openLiveTime).getTime();
        }else {
          this.common.popToastView('请选择时间!');
        }
      }else {
        liveTime = stime;
      }
      const sign = this.common.sign({
        uid: uid,
        stime: stime,
        title: this.liveTitle,
        desc: this.liveDesc,
        thumb: this.liveImg,
        cid: livecid,
        goodids: goodids,
        type: liveType,
        livetime: liveTime,
        status: liveStatus,
        salt: this.userInfo.salt// 私钥
      }); // 签名
      const param = {
        uid: uid,
        stime: stime,
        title: this.liveTitle,
        desc: this.liveDesc,
        thumb: this.liveImg,
        cid: livecid,
        goodids: goodids,
        type: liveType,
        livetime: liveTime,
        status: liveStatus,
        sign: sign,
      };console.log(param);
      // tslint:disable-next-line:variable-name
      const api_url = this.common.wx_urlList.addLive;
      console.log(api_url);
      this.common.post(api_url, param).then((response: any) => {
        const code = response.code; console.log(JSON.stringify(response));
        if (code == 'success') {
          if(liveType == 1){
            this.common.popToastView('添加预告成功!');
            this.goBack();
          }else {
            const data = response.data;
            // tslint:disable-next-line:max-line-length
            Wxlive.startLive(data.id + ";" + data.pushUrl, result => {
            }, error => alert(error));
          }
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


  loadUserInfo() {
    this.userInfo = this.store.get('userInfo');
  }
  loadTimediff() {
    this.timediff = this.common.changeStr(this.store.get('timedifflong'), '0');
  }
  //选择直播类型
  chooseLiveType(flag) {
    if (flag == 0) {
      //直播
      this.czCheck = true;
      this.cyCheck = false;
    } else {
      //预告
      this.czCheck = false;
      this.cyCheck = true;
    }
  }

  goBack() {
    this.store.remove("goodIdList");
    this.navController.back();
  }
}
