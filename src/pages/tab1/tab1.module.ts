import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {Tab1Page} from './tab1';
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    Tab1Page,
  ],
  imports: [
    ChartsModule,
    IonicPageModule.forChild(Tab1Page),
  ],
})
export class Tab1PageModule {}
