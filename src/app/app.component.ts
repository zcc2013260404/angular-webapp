import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  lastTimeBackPress = 0;

  timePeriodToExit = 2000;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public common: CommonService,
    private router: Router
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      if (this.router.url == '/tabs/tabgoods' || this.router.url == '/tabs/tabstore'
        || this.router.url == '/tabs/tablive' || this.router.url == '/tabs/tabzc'
        || this.router.url == '/tabs/tabme') {
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          navigator['app'].exitApp(); //退出APP
        } else {
          this.common.popToastView('再按一次退出APP');
          this.lastTimeBackPress = new Date().getTime();//再按
        }
      }
    })
  }
}
