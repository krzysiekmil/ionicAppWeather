import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, ToastController} from 'ionic-angular';
import {City} from "../model/city";
import {DataService} from "../../providers/data-service/data-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {Geolocation} from '@ionic-native/geolocation';
import {isNullOrUndefined} from "util";


declare var google;

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage implements OnInit{
  cityList:City[]=[];
  userCityList: City[] = [];
  constCityList:Array<City>=[];
  lng: any;
  lat: any;
  loading: Loading;
  currentCity: any;


  constructor(public toastCtrl: ToastController, public dataService: DataService, public userService: UserServiceProvider, public nav: NavController, private geolocation: Geolocation, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewCanEnter():boolean{
    let result = this.userService.isUser();
    if (!isNullOrUndefined(result))
      return result;//result;
    else
      return false;
  }

  presentToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 1800,
      position: 'top',

    });
    toast.present();
  }



  ngOnInit(){
    this.getCityList();
    this.getUserCity();
    this.dataService.setState(true);
    this.myLocation();

  }

  filterCity(ev:any){
    this.cityList=this.constCityList;
    let val=ev.target.value;
    if(val&&val.trim()!==''){
      this.cityList=this.cityList.filter(function (city) {
        return city.name.toLowerCase().includes(val.toLowerCase());
      })
    }
  }

  addCityToList(cityName: string) {
    cityName[0].toLocaleUpperCase();
    this.dataService.addCityToUser(cityName).subscribe(success => {
      if (success === 200) {
        let city = new City();
        city.name = cityName;
        this.userCityList.push(city);
        this.dataService.setState(true);
        this.presentToast('Add successful')
      }
      else {
        this.presentToast('Upsss ... ')
      }
    });
  }

  getUserCity() {
    this.dataService.getCityListForUser().subscribe(result => this.userCityList = result)
  }

  deleteCity(cityName: string) {
    this.dataService.deleteCityFromUserList(cityName).subscribe(success => {
      if (success === 200) {
        this.dataService.setState(true);
        let index = this.userCityList.findIndex(c => c.name === cityName);
        this.userCityList.splice(index, 1);
        this.presentToast('Delete successful!')
      }
    });
  }

  getCityList() {
    this.dataService.getCityList().subscribe(result =>
    {
      this.cityList = result;
      this.constCityList=this.cityList;
    });
  }

  isOnList(city:City): boolean {
    return this.userCityList.some(c => c.name == city.name);
  }

  myLocation() {
    let geocoder = new google.maps.Geocoder();
    this.showLoading();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lng = resp.coords.longitude;
      this.lat = resp.coords.latitude;
      geocoder.geocode({'location': {lat: this.lat, lng: this.lng}}, (results, status) => {
        if (status === 'OK') {
          this.currentCity = results[0].formatted_address;
          console.log(results[0].address_components);
        }
        else {
          this.presentToast('Error, Try again !!!')
        }
        this.loading.dismissAll();
      })
    }).catch(error => {
      this.loading.dismissAll();
      this.showError(error);
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
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

  restart() {
    this.lat = null;
    this.lng = null;
    this.currentCity = null;
  }

}
