import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {City} from "../model/city";
import {DataService} from "../../providers/data-service/data-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage implements OnInit{
  cityList:City[]=[];
  userCityList: City[] = [];
  constCityList:Array<City>=[];

  constructor(public dataService: DataService, public userService: UserServiceProvider, public nav: NavController) {
  }

  ionViewCanEnter():boolean{
    return this.userService.isUser();
  }


  ngOnInit(){
    this.getCityList();
    this.getUserCity();
    this.dataService.setState(true);

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
      this.constCityList=this.cityList;
    });
  }

  isOnList(city:City): boolean {
    return this.userCityList.some(c => c.name == city.name);
  }

}
