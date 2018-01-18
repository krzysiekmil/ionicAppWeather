import {Component, DoCheck, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DataService} from "../../providers/data-service/data-service";
import {CityData} from "../model/cityData";
import {City} from "../model/city";

/**
 * Generated class for the Tab1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page implements DoCheck, OnInit, OnDestroy {
  @ViewChild('map') mapElement: ElementRef;
  loading: Loading;
  map: google.maps.Map;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  geocoder = new google.maps.Geocoder;
  lat: number = 0;
  lng: number = 0;
  public cityData: CityData;
  cityList: City[];
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
  public test: string;

  public constructor(private dataService: DataService, private loadingCtrl: LoadingController, public navParams: NavParams, public navCtrl: NavController, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.test = this.navParams.data.tabParam;
    this.showLoading();
    console.log(this.lng + "x" + this.lat);
    this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode({'address': this.test}, (results, status) => {
      if (status === 'OK') {
        this.lng = results[0].geometry.location.lng();
        this.lat = results[0].geometry.location.lat();
        console.log(this.lng + "x" + this.lat);
        this.initMap();
      }
      else {
        this.showError("CHYBA SIE DUPLO");
      }
      this.getCityData(this.test);
    })
  }

  showError(text) {
    this.loading.dismissAll();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  initMap() {
    console.log(this.lng + "x" + this.lat);
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 8,
      center: {lat: this.lat, lng: this.lng}
    });
    console.log(this.lng + "x" + this.lat);
    // this.loading.dismissAll();
    this.directionsDisplay.setMap(this.map);
  }

  ngDoCheck() {

    this.width = window.screen.width;
    this.height = window.screen.height;

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
        this.getCityData(this.test);
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



