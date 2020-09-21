import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from "../services/common.service";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-accountsafe',
  templateUrl: './accountsafe.page.html',
  styleUrls: ['./accountsafe.page.scss'],
})
export class AccountsafePage implements OnInit {

  constructor(public common: CommonService,
              public store: StorageService,
              public navController: NavController,
              public alertController: AlertController,
              public route: ActivatedRoute) { }

  ngOnInit() {
  }

  goBack() {
    this.navController.back();
  }

  async unbindAlert() {
    const alert = await this.alertController.create({
      header: '解除绑定',
      message: '确认要解除绑定吗?',
      buttons: ['取消', '确认']
    });
    await alert.present();
  }

  async withdrawAlert() {
    const alert = await this.alertController.create({
      header: '修改密码',
      inputs: [
        {
          name: 'password',
          type: 'text',
          value: '',
          placeholder: '修改密码'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确认',
          handler: (result) => {
            console.log(result);
          }
        }
      ]
    });

    await alert.present();
  }

  async phoneAlert() {
    const alert = await this.alertController.create({
      header: '更换手机号',
      inputs: [
        {
          name: 'phone',
          type: 'text',
          value: '188****8888',
          placeholder: '手机号码'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确认',
          handler: (result) => {
            console.log(result);
          }
        }
      ]
    });

    await alert.present();
  }
}
