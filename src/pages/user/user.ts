import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {City} from "../model/city";
import {DataService} from "../../providers/data-service/data-service";

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage implements OnInit,DoCheck{
  constCityList:City[]=[];
  cityList: City[] = [];
  userCityList: City[] = [];
  city: City;

  constructor(public dataService: DataService) {
  }
   ngDoCheck() {
     if(this.cityList.length!=this.constCityList.length)
     {
     this.cityList.push(this.constCityList);
   }
    console.log(this.cityList);
     console.log(this.constCityList);
   }

  ngOnInit() {
    this.cityList=[{id:7,name:'Warszawa'},{id:8,name:'Krakow'},{id:9,name:'Lodz'}];
    this.constCityList=[{id:7,name:'Warszawa'},{id:8,name:'Krakow'},{id:9,name:'Lodz'}];
    this.getCityList();
    this.getUserCity();
    this.dataService.setState(true);

  }

  filterCity(ev:any){
    let val=ev.target.value;
    if(val&&val.trim()!==''){
      this.cityList=this.cityList.filter(function (item) {
        return item.name.toLowerCase().includes(val.toLowerCase());
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
      }
    });
  }

  getCityList() {
    this.dataService.getCityList().subscribe(result =>
    {
      this.cityList = result;
      this.constCityList.concat(this.cityList);
    });
  }

  isOnList(city: City): boolean {
    return this.userCityList.some(c => c.name == city.name);
  }

}
