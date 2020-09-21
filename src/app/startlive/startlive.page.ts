import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-startlive',
  templateUrl: './startlive.page.html',
  styleUrls: ['./startlive.page.scss'],
  animations: [
    trigger('showChooseGoods', [
      state('up', style({
        bottom: '0rem'
      })),
      state('down', style({
        bottom: '-30rem'
      })),
      transition('up => down', [animate('0.3s')]),
      transition('down => up', [animate('0.3s')])
    ]),
    trigger('showShareType', [
      state('up', style({
        bottom: '0rem'
      })),
      state('down', style({
        bottom: '-23rem'
      })),
      transition('up => down', [animate('0.3s')]),
      transition('down => up', [animate('0.3s')])
    ])
  ]
})
export class StartlivePage implements OnInit {

  public isloading = false;
  public showGoods = false;
  public showShare = false;
  public showFooter = true;//当输入时隐藏底部
  public floadingsuccess = false;//首次加载是否成功
  public msgboxbottom = 0;//发送框底部
  public lpic = '../../assets/nologin.png';//头像
  public lscount = 1;//在线人数
  public lpcount = 0;//点赞数
  public timerstr = '00:00:00';//计时
  public timercount = 0;//计时
  public msgList = [];//互动聊天
  public msg = '';//留言

  public srecordflag = false;//开始计时

  constructor(
    public navController: NavController) { }

  ngOnInit() {
    this.floadingsuccess = true;
    this.startRecord();
    this.initVideo();
  }

  //开始计时
  startRecord() {
    setInterval(() => {
      this.srecordflag = !this.srecordflag;
      this.timercount += 1;
      this.secondToDate(this.timercount);
    }, 1000);
  }

  //生成时间
  secondToDate(result) {
    let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    this.timerstr = h + ":" + m + ":" + s;
  }

  initVideo() {

  }

  showSendBox() {

  }

  send() {

  }

  goGoods() {

  }

  share() {

  }

  shareWxFrind() {

  }

  shareWxQ() {

  }

  praise() {

  }

  closeMask() {

  }

  goBack() {
    this.navController.navigateForward(['/mylive'], {
      replaceUrl: true,
      animated: true
    });
  }
}
