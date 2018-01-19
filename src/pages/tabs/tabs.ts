import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {UserPage} from "../user/user";


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
  userRoot: any = 'UserPage';
  myIndex: number;

  constructor(navParams: NavParams, public userService: UserServiceProvider, private alertCtrl: AlertController, public navCtrl: NavController, public test: UserPage, private app: App) {
    this.myIndex = navParams.data.tabIndex || 2;
  }


  public logout() {
    this.userService.logout();

    this.app.getRootNav().setRoot('LoginPage');
  }
  isAdmin(){
    return this.userService.isAdmin();
  }
  isUser(){
    return this.userService.isUser();
  }

  showError(text) {

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
