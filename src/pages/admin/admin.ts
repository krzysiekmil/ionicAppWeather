import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{DataService} from "../../providers/data-service/data-service";
import {City} from "../model/city";
import {UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage implements OnInit{
  public cityList: City[] = [];
  public city: City = {id: null, name: null};
  public change: boolean = null;
  newCity={name:''};

  constructor(public navCtrl: NavController, public navParams: NavParams,private dataService: DataService , private userService:UserServiceProvider) {
    this.city = new City();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
  ionViewCanEnter():boolean{
    return this.userService.isAdmin();
  }


  getCityList() {
    this.dataService.getCityList().subscribe(data => this.cityList = data);

  }

  addCity() {
    this.dataService.addCityS(this.newCity.name).subscribe(status => {
      this.change = true;
      let city = new City()
      city.name = this.newCity.name;
      this.cityList.push(city);
      this.newCity.name='';
    });
  }

  deleteCity(cityName: string) {
    let index = this.cityList.findIndex(c => c.name === cityName);
    this.cityList.splice(index, 1);
    this.dataService.deleteCity(cityName).subscribe();
    this.change = true;

  }

  ngOnInit() {
    this.getCityList();
    this.change = false;
  }

}
