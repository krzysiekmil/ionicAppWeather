import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DataService} from "../../providers/data-service/data-service";
import {CityData} from "../model/cityData";
import {City} from "../model/city";

/**
 * Generated class for the Tab1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page implements DoCheck, OnInit, OnDestroy {
  cityList: City[];
  public cityData: CityData;
  public currentCityData: CityData[];
  public lineChartData: any[] = [];
  public lineChartLabels: Array<any> = [];
  public chartData: Array<any> = [];
  public dataSets: Array<{ data: Array<any[]> | any[], label: string }>;
  public name: string;
  private sub: any;
  public nameLast: string;
  public tempLast: any;
  public timeLast: any;
  public status: number;
  loading: Loading;


  public constructor(private dataService: DataService, private loadingCtrl: LoadingController, public navParams: NavParams, public navCtrl: NavController) {
    this.test = navParams.data.tabParam;
    console.log("tabParam")
    console.log(this.test);
    console.log("this.navParams.data.tabTitle ");
    console.log(navParams.data.tabTitle);
    console.log("this.navParams.data.tabIndex con");
    console.log(navParams.data.tabIndex);
  }

  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#6effd1',
      pointHoverBackgroundColor: '#ff646e',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#ff4653',
      pointHoverBackgroundColor: '#ff33f9',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },

    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#d0ff8a',
      pointHoverBackgroundColor: '#27ff82',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend = true;
  public width: number;
  public height: number;
  public lineChartType = 'line';
  public test: string = '';

  ngOnInit() {
    this.getCityData(this.navParams.data.tabParam);
  }

  ngDoCheck() {

    this.width = window.screen.width * 0.95;
    this.height = screen.availHeight * 0.7;
    this.lineChartData = this.lineChartData.slice();

  }


  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  public getCity() {
    return this.dataService.getCityList().subscribe(data => {
      this.cityList = data;
      this.cityList.forEach(city => {
        this.getCityData(city.name);
        this.chartData = this.chartData.slice();
        this.chartData.push(this.lineChartData);
        this.lineChartData = [];
      });
    });
  }

  public getAllTemp() {
    return this.dataService.getAllTemp().subscribe(data => this.currentCityData = data);
  }

  public getCityData(name: string) {
    return this.dataService.getTempCity(name).subscribe(
      data => {
        this.currentCityData = data;
        this.currentCityData.forEach(cd => {
          this.lineChartData.push(cd.temp);
          this.lineChartLabels.push(cd.time);
        });
        this.tempLast = this.currentCityData.find(d => d.id > 0).temp;
        this.timeLast = this.currentCityData.find(d => d.id > 0).time;
        this.lineChartData.reverse();
        this.lineChartLabels.reverse();
        this.lineChartLabels = this.lineChartLabels.slice();
        this.lineChartData = this.lineChartData.slice();
      })
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public refresh() {
    this.showLoading();
    this.dataService.refreshData().subscribe(successCode => {
      if (successCode === 200) {
        this.getCityData(this.navParams.data.tabParam);
      }
      this.loading.dismissAll();
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
}



