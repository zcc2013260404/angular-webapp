import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatusbarService } from '../services/statusbar.service';
import { Router, NavigationExtras } from '@angular/router';
import { CommonService } from '../services/common.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-orderaddresslist',
  templateUrl: './orderaddresslist.page.html',
  styleUrls: ['./orderaddresslist.page.scss'],
})
export class OrderAddresslistPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public userInfo: any;// user info

  public isloading = false;

  public adata = [];

  constructor(
    private statusbarService: StatusbarService,
    public navController: NavController,
    public common: CommonService,
    public store: StorageService,
    private router: Router) {}

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadUserInfo();
    this.loadData();
  }

  goBack() {
    this.navController.back();
  }



  choose(item) {
    console.log("orderAddressList:"+JSON.stringify(item));
    //{"id":"4","realname":"fdsa","mobile":"18609209476","province":"陕西省","city":"西安市","area":"雁塔区","address":"dsfdsafs","isdefault":"0"}
    this.navController.navigateForward(['/ordercommit'],{
      queryParams:{
        type:"address",
        id : item.id,
        realname : item.realname,
        mobile : item.mobile,
        province : item.province,
        city : item.city,
        area : item.area,
        address : item.address
      }
    });
    this.goBack();
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
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'sign': sign,
        'stime': stime
      };
      let api_url = this.common.wx_urlList.loadAddress;
      this.common.post(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {
          this.adata = response.data;
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
