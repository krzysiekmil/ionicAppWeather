import {NgModule} from '@angular/core';
import {IonicPageModule, NavController} from 'ionic-angular';
import {TabsPage} from './tabs';
import {UserPage} from "../user/user";
import {UserPageModule} from "../user/user.module";

@NgModule({
  declarations: [

    TabsPage,

  ],
  imports: [
    UserPageModule,
    IonicPageModule.forChild(TabsPage),
  ],
  providers: [
    UserPageModule,
    NavController,
    UserPage


  ]
})
export class TabsPageModule {}
