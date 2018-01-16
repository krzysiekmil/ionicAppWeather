import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";

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

  constructor(navParams: NavParams,public userService:UserServiceProvider,public navCtrl:NavController) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 2;
  }
  ionViewCanEnter():boolean{
    return this.userService.isUser();
  }
  public logout() {
    this.userService.logout();
      this.navCtrl.setRoot('LoginPage');
  }
  isAdmin(){
    return this.userService.isAdmin();
  }
  isUser(){
    return this.userService.isUser();
  }
}
