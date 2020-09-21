import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-subscribelive',
  templateUrl: './subscribelive.page.html',
  styleUrls: ['./subscribelive.page.scss'],
})
export class SubscribelivePage implements OnInit {

  constructor(
    private common: CommonService,
    public navController: NavController) { }

  ngOnInit() {
  }

  sublive() {
    this.common.popToastView('预约成功');
  }

  goBack() {
    this.navController.back();
  }
}
