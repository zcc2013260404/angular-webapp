import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusbarService {

  public headerBarPaddingTop = '0px';

  public platformStr = 'android';

  constructor() { }

  setPlatform(pstr) {
    this.platformStr = pstr;
  }

  setHeaderBarPaddingTop() {
    if (this.platformStr == 'android') {
      this.headerBarPaddingTop = '25px';
    } else {
      this.headerBarPaddingTop = '20px';
    }
  }

  getHeaderBarPaddingTop() {
    return this.headerBarPaddingTop;
  }

  initStatusBar(statusBar) {
    statusBar.styleDefault();
    statusBar.overlaysWebView(true);
  }

}
