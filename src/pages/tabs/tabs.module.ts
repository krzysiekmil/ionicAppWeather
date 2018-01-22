import {NgModule} from '@angular/core';
import {IonicPageModule, NavController} from 'ionic-angular';
import {TabsPage} from './tabs';
import {UserPage} from "../user/user";

@NgModule({
  declarations: [

    TabsPage,

  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
  ],
  providers: [
    UserPage,
    NavController
  ]
})
export class TabsPageModule {}
