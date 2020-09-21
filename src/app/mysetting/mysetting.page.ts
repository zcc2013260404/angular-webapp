import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatusbarService } from '../services/statusbar.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-mysetting',
  templateUrl: './mysetting.page.html',
  styleUrls: ['./mysetting.page.scss'],
})
export class MysettingPage implements OnInit {

  public headerBarPaddingTop = '0px';

  constructor(
    private statusbarService: StatusbarService,
    public navController: NavController,
    public store: StorageService) { }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
  }


  goBack() {
    this.navController.back();
  }

  persionInfo() {
    this.navController.navigateForward('/personaldata');
  }
  aboutusInfo(){
    this.navController.navigateForward('/aboutus');
  }
  useragreementInfo(){
    this.navController.navigateForward('/useragreement');
  }
  privacyagreementInfo(){
    this.navController.navigateForward('/privacyagreement');
  }

  account() {
    this.navController.navigateForward('/accountsafe');
  }

  exit() {
    this.store.remove("userInfo");
    this.navController.navigateForward('/tabs/tabgoods');
  }
}
