import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service';
import { StatusbarService } from '../services/statusbar.service';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-invitestore',
  templateUrl: './useragreement.page.html',
  styleUrls: ['./useragreement.page.scss'],
})
export class UseragreementPage implements OnInit {

  public headerBarPaddingTop = '0px';

  public isloading = false;

  public loading = null;

  public userInfo: any;// user info

  public info="";
  constructor(
    private statusbarService: StatusbarService,
    public store: StorageService,
    public navController: NavController,
    public common: CommonService) { }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    // this.loadUserInfo();
    this.loadData();
  }


  goBack() {
    this.navController.back();
  }
  loadData() {
    this.isloading = true;
    let param = {
    };
    let api_url = this.common.wx_urlList.useragreement;
    this.common.ajaxPost(api_url, param).then((response: any) => {
      let code = response.code;
      if (code == 'success') {
        let data = response.data;
        this.info = data.content;
      } else {
        this.common.popToastView(response.msg);
      }
      this.isloading = false;
    }).catch(() => {
      this.isloading = false;
      this.common.popToastView('网络异常!');
    });

  }

  loadUserInfo() {
    this.userInfo = this.store.get('userInfo');
  }
}
