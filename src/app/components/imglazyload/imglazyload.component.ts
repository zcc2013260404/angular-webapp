import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'img-lazy-load',
  templateUrl: './imglazyload.component.html',
  styleUrls: ['./imglazyload.component.scss'],
})
export class ImglazyloadComponent implements OnInit {

  constructor() { }

  imgSrc: string = '';//img src
  imgLoadComplete: boolean = false;//is load flashed?
  imgBorderRadius = ['0px', '0px', '0px', '0px'];//img border radius
  bordertopleftradius = '0px';
  bordertoprightradius = '0px';
  borderbottomleftradius = '0px';
  borderbottomrightradius = '0px';
  imgShowLoadingTxt: boolean = true;
  imgLoadingTxtLineHeight: '2rem';

  @Input() src: string; //param in
  @Input() borderRadius: string;//img border radius param
  @Input() showLoadingTxt: true;
  @Input() loadingTxtLineHeight: '2rem';

  ngOnInit() {
    this.imgSrc = this.src;
    if (this.showLoadingTxt != null && this.showLoadingTxt != undefined) {
      this.imgShowLoadingTxt = this.showLoadingTxt;
    }
    if (this.loadingTxtLineHeight != null && this.loadingTxtLineHeight != undefined) {
      this.imgLoadingTxtLineHeight = this.loadingTxtLineHeight;
    }
    if (this.borderRadius) {
      let array = this.borderRadius.split(",");
      let index = 0;
      array.forEach(item => {
        this.imgBorderRadius[index] = item;
        index = index + 1;
      });
      this.bordertopleftradius = this.imgBorderRadius[0];
      this.bordertoprightradius = this.imgBorderRadius[1];
      this.borderbottomleftradius = this.imgBorderRadius[2];
      this.borderbottomrightradius = this.imgBorderRadius[3];
    }
  }

  imgDidLoad(e) {
    this.imgLoadComplete = true;
    e.srcElement.shadowRoot.firstChild.style = "border-top-left-radius:" + this.bordertopleftradius + ";border-top-right-radius:" + this.bordertoprightradius + ";border-bottom-left-radius:" + this.borderbottomleftradius + ";border-bottom-right-radius:" + this.borderbottomrightradius;
  }

  imgError() {
    this.imgLoadComplete = false;
  }

}
