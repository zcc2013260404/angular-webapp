import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController,PickerController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';
import { StorageService } from '../services/storage.service';
import { StatusbarService } from '../services/statusbar.service';
// import { addjson } from '../../assets/data/city-data.json';
// import { PickerController } from '@ionic/angular'

@Component({
  selector: 'app-addressedit',
  templateUrl: './addressedit.page.html',
  styleUrls: ['./addressedit.page.scss']
})
export class AddresseditPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public isloading = false;

  public loading = null;

  public userInfo: any;// user info

  public aid = '';

  public type = 0;
  public  province =""
  public cityList =[]
  public city =""
  public areaList =[]
  public area =""


  public  province1 =""
  public city1 =""
  public area1 =""
  /**
   * 'realname': this.adata.realname,
   'mobile': this.adata.mobile,
   'province': this.adata.province,
   'city': this.adata.city,
   'area': this.adata.area,
   'address': this.adata.address,
   */
 public adata = {
    'aid': '',
    'realname': '',
    'mobile': '',
    'province': '陕西省',
    'city': '西安市',
    'area': '雁塔区',
    'address': '',
    'isdefault': false
  };
  public multiColumnOptions =   require('../../assets/data/city-data.json');
  constructor(
    public ref: ChangeDetectorRef,
    private statusbarService: StatusbarService,
    public common: CommonService,
    public store: StorageService,
    public navController: NavController,
    public loadingController: LoadingController,
    public pickerController: PickerController,
    public route: ActivatedRoute) { 
    }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.route.queryParams.subscribe((data) => {
      this.type = data.type;
      this.aid = data.aid;
    });
    this.loadUserInfo();
    if (this.type == 1) {
      //编辑
      this.loadData();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: '加载中...',
    });
    await this.loading.present();
  }

  getCity(e){
    // debugger
    // this.show = false;
    let curCitylist = this.multiColumnOptions.filter(item =>item.name==this.province)
    // this.cityList =  curCitylist[0]['children']
    this.cityList =  curCitylist[0].children
    this.city = ""
    this.area=""
    this.areaList = []
    console.log(this.cityList,1111111,this.province);
    
  }
  getArea(e){
    this.area=""
    let curAreaList = this.cityList.filter(item =>item.name==this.city)
    // this.areaList =  curAreaList[0]['children']
    this.areaList = curAreaList[0].children;
   
    console.log(this.areaList,2222,this.city);
  }
  getaddres(e){
          console.log(3333,this.area);
  }
  goBack() {
    this.navController.back();
  }

  save() {
      console.log(this.province,this.city,this.area);


    console.log(this.adata);
    this.presentLoading();
    let uid = this.userInfo.uid;
    if (uid) {
      //时间差
      let timedifflong = 0;
      if (this.userInfo.timedifflong) {
        timedifflong = this.userInfo.timedifflong;
      }
      let stime = new Date().getTime() + timedifflong;
      let addressDefault = 0;
      if (this.adata.isdefault){
        addressDefault = 1;
      }

      let sign = this.common.sign({
        'uid': uid,
        'realname': this.adata.realname,
        'mobile': this.adata.mobile,
        'province': this.province,
        'city': this.city,
        'area': this.area,
        'address': this.adata.address,
        'stime': stime,
        'isdefault': addressDefault,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'realname': this.adata.realname,
        'mobile': this.adata.mobile,
        'province': this.province,
        'city': this.city,
        'area': this.area,
        'address': this.adata.address,
        'stime': stime,
        'isdefault': addressDefault,
        'sign': sign
      };
      let api_url = this.common.wx_urlList.saveAddress;
      this.common.post(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          this.goBack();
        } else {
          this.common.popToastView(response.msg);
        }
        setTimeout(() => {
          if (this.loading) {
            this.loading.dismiss();
          }
        }, 400);
      }).catch(() => {
        this.isloading = false;
        this.common.popToastView('网络异常!');
      });
    }
  }

  loadData() {
    this.isloading = true;
    let uid = this.userInfo.uid;
    if (uid) {
      //时间差
      let timedifflong = 0;
      if (this.userInfo.timedifflong) {
        timedifflong = this.userInfo.timedifflong;
      }
      let stime = new Date().getTime() + timedifflong;
      let sign = this.common.sign({
        'uid': uid,
        'stime': stime,
        'aid': this.aid,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'sign': sign,
        'aid': this.aid,
        'stime': stime
      };
      let api_url = this.common.wx_urlList.loadAddressInfo;
      this.common.post(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          // debugger
          this.adata = response.data;
          //修改
          console.log("detail",this.adata)
          // debugger
          this.province1 = response.data.province;
          this.city1 = response.data.city;
          this.area1 = response.data.area;
          // this.ref.markForCheck();
          // this.ref.detectChanges()
          // @ts-ignore
          if (this.adata.isdefault == '1'){
            this.adata.isdefault = true;
          }else {
            this.adata.isdefault = false;
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

}
