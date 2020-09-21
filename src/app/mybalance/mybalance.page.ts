import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatusbarService } from '../services/statusbar.service';
import {CommonService} from '../services/common.service';
import {StorageService} from '../services/storage.service';
import {EventService} from '../services/event.service';

@Component({
  selector: 'app-mybalance',
  templateUrl: './mybalance.page.html',
  styleUrls: ['./mybalance.page.scss'],
})
export class MybalancePage implements OnInit {

  public headerBarPaddingTop = '0px';


  public userInfo: any; // user info
  public meInfo: any;

  constructor(
    private statusbarService: StatusbarService,
    public common: CommonService,
    public store: StorageService,
    public navController: NavController,
    public eventService: EventService) {}

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
    this.loadUserInfo();
  }


  loadUserInfo() {
    this.userInfo = this.store.get('userInfo');
    this.meInfo = this.store.get('meInfo');
  }


  goBack() {
    this.navController.back();
  }

}
