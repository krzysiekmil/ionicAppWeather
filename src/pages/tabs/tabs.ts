import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any   = 'Tab1Page';
  tab2Root: any   = 'Tab2Page';
  adminRoot:any   = 'AdminPage';
  specialRoot:any = 'SpecialPage';
  userRoot:any    = 'UserPage';
  myIndex: number;

  constructor(navParams: NavParams,public auth:AuthService,public navCtrl:NavController) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;
  }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.push('LoginPage')
    });
  }
}
