import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatusbarService } from '../services/statusbar.service';
import {CommonService} from '../services/common.service';
import {StorageService} from '../services/storage.service';
import {EventService} from '../services/event.service';

@Component({
  selector: 'app-personaldata',
  templateUrl: './personaldata.page.html',
  styleUrls: ['./personaldata.page.scss'],
})
export class PersonaldataPage implements OnInit {

  public headerBarPaddingTop = '0px';
  public userInfo: any;

  public nick:any;
  public fileToUpload:any;
  public liveImg: any;
  public uploadImg = "";

  constructor(
    private statusbarService: StatusbarService,
    public store: StorageService,
    public common: CommonService,
    public navController: NavController) { }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadUserInfo();
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
        cthis.userInfo.avatar = response.url;
        cthis.uploadImg = response.filename;
      } else {
        this.common.popToastView(response.msg);
      }
    }).catch((e) => {
      console.log(e);
      this.common.popToastView('网络异常!');
    });
  }


  loadUserInfo() {
    this.userInfo = this.store.get('userInfo');
  }

  save(){
    /**
     * uid	是	int	用户id
     sign	是	string	签名
     stime	是	int	请求时间
     nickname	是	string	用户昵称
     avatar	是	string	用户头像
     */
    let cthis = this;
    console.log(this.userInfo);
    let uid = this.userInfo.uid;
    if (uid) {
      //时间差
      let timedifflong = 0;
      if (this.userInfo.timedifflong) {
        timedifflong = this.userInfo.timedifflong;
      }
      let stime = new Date().getTime() + timedifflong;
      let avatar = this.userInfo.avatar;

      let sign = this.common.sign({
        'uid': uid,
        'nickname': this.userInfo.uname,
        'avatar': avatar,
        'stime': stime,
        'salt': this.userInfo.salt//私钥
      });//签名
      let param = {
        'uid': uid,
        'nickname': this.userInfo.uname,
        'avatar': avatar,
        'stime': stime,
        'sign': sign
      };
      console.log(param);
      let api_url = this.common.wx_urlList.updataUserInfo;
      this.common.post(api_url, param).then((response: any) => {
        let code = response.code;
        if (code == 'success') {

          cthis.store.set('userInfo', this.userInfo);

          this.goBack();
        } else {
          this.common.popToastView(response.msg);
        }

      }).catch(() => {
        this.common.popToastView('网络异常!');
      });
    }
  }

  goBack() {
    this.navController.back();
  }
}
