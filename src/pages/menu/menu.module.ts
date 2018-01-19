import {NgModule} from '@angular/core';
import {IonicPageModule, NavController} from 'ionic-angular';
import {MenuPage} from './menu';
import {UserPage} from "../user/user";
import {Tab1Page} from "../tab1/tab1";
import {Tab2Page} from "../tab2/tab2";

@NgModule({
  declarations: [
    MenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
  ],
  providers: [
    UserPage,
    Tab1Page,
    Tab2Page,
    NavController
  ]
})
export class MenuPageModule {}
