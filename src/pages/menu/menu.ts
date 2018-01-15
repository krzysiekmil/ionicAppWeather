import {Component, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage = 'TabsPage';
  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    { title: 'Tab 1'  , pageName: 'TabsPage'  ,tabComponent: 'Tab1Page'   ,index: 0 , icon: 'home' },
    { title: 'Tab 2'  , pageName: 'TabsPage'  ,tabComponent: 'Tab2Page'   ,index: 1 , icon: 'contacts' },
    { title: 'User'  , pageName: 'UserPage'  ,tabComponent: 'UserPage'  ,index: 3 , icon: 'person' },

  ];


  constructor(public navCtrl: NavController,public userService:UserServiceProvider) {

  }

  ionViewCanEnter(): boolean {
    return this.userService.isUser();
  }

  isAdmin(){
    return this.userService.isAdmin();
  }

  openPage(page: PageInterface) {
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();

    if (childNav) {
      childNav.getSelected()
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

}
