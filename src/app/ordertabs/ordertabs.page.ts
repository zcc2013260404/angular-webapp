import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatusbarService } from '../services/statusbar.service';

@Component({
  selector: 'app-ordertabs',
  templateUrl: './ordertabs.page.html',
  styleUrls: ['./ordertabs.page.scss'],
})
export class OrdertabsPage implements OnInit {

  public headerBarPaddingTop = '0px';

  constructor(
    private statusbarService: StatusbarService,
    public navController: NavController) { }

  ngOnInit() {
    this.headerBarPaddingTop = this.statusbarService.getHeaderBarPaddingTop();
  }

  goBack() {
    this.navController.navigateForward("/tabs/tabme");
  }
}
