import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {City} from "../model/city";
import {DataService} from "../../providers/data-service/data-service";
import {Tab1Page} from "../tab1/tab1";

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
  param?: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit, DoCheck {
  public userCityList: City[] = [];
  rootPage = 'TabsPage';
  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    {title: 'User', pageName: 'TabsPage', tabComponent: 'UserPage', index: 1, icon: 'clipboard'},
    {title: 'Settings', pageName: 'TabsPage', tabComponent: 'Tab2Page', icon: 'construct'},
    {title: 'Charts', pageName: 'TabsPage', tabComponent: 'Tab1Page', index: 0, icon: 'partly-sunny'},
    {title: 'Test', pageName: 'SpecialPage', icon: null}


  ];


  constructor(public navCtrl: NavController, public userService: UserServiceProvider, private dataService: DataService) {
  }

  ngOnInit() {
    this.getUserCityList();
  }

  ngDoCheck() {
    if (this.dataService.getState() == true) {
      this.pages = [
        {title: 'CityList', pageName: 'TabsPage', tabComponent: 'UserPage', index: 1, icon: 'clipboard'},
        {title: 'Settings', pageName: 'TabsPage', tabComponent: 'Tab2Page', icon: 'construct'},
        {title: 'Charts', pageName: 'TabsPage', tabComponent: 'Tab1Page', index: 0, icon: 'partly-sunny'},
        {title: 'Test', pageName: 'SpecialPage', icon: null}
      ];
      this.getUserCityList();
      this.dataService.setState(false);
    }
  }

  getUserCityList() {
    this.dataService.getCityListForUser().subscribe(result => {
      this.userCityList = result;
      this.userCityList.forEach(city => {
        this.pages.push({
          title: city.name,
          pageName: 'Tab1Page',
          tabComponent: 'Tab1Page',
          icon: null,
          param: city.name,
        })
      });
    });
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
      console.log(this.pages.forEach(page => {
        console.log(page.param)
      }));
      params = {tabIndex: page.index, tabParam: page.param};
      console.log(params);
    }
    else {
      params = {tabParam: page.param};
      console.log(params);
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
    if (this.nav.getActive() && this.nav.getActive().name === page.title) {
      return 'primary';
    }
    return;
  }

}
