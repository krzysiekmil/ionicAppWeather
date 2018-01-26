import {Injectable} from '@angular/core';
import {CityData} from '/home/krzysiek/ionicApp/src/pages/model/cityData';
import {City} from '/home/krzysiek/ionicApp/src/pages/model/city';
import {Observable} from "rxjs/Observable";
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch"
import {User} from "/home/krzysiek/ionicApp/src/pages/model/user";
import {Role} from "/home/krzysiek/ionicApp/src/pages/model/role";
import {AuthenticationService} from "../authentication-service/authentication-service";

@Injectable()
export class DataService {
  public cityUrl = 'http://default-environment.pbsfzikagw.eu-central-1.elasticbeanstalk.com/city';
  public cityData = 'http://default-environment.pbsfzikagw.eu-central-1.elasticbeanstalk.com/cityData';
  public currentCityData = 'http://default-environment.pbsfzikagw.eu-central-1.elasticbeanstalk.com/cityDatat/';
  public addCityURL = 'http://default-environment.pbsfzikagw.eu-central-1.elasticbeanstalk.com/city';
  public deleteCityURL = 'http://default-environment.pbsfzikagw.eu-central-1.elasticbeanstalk.com/city';
  public getCityListURL = 'http://default-environment.pbsfzikagw.eu-central-1.elasticbeanstalk.com/city';
  public userUrl = 'http://default-environment.pbsfzikagw.eu-central-1.elasticbeanstalk.com/user';
  public state: boolean;
  public _code: any;
  public cityList: City[] = [];


  constructor(private http: Http, private auth: AuthenticationService) {
  }

  getcode(): any {
    return this._code;
  }

  setcode(value: any) {
    this._code = value;
  }

  public getState(): boolean {
    return this.state;
  }

  public setState(state: boolean) {
    this.state = state;
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

  private extractData(res: Response) {
    return res.json();
  }

  public getUser(): Observable<User[]> {
    return this.http.get(this.userUrl, null).map(this.extractData).catch(this.handleError);
  }

  public updateRole(role: Role) {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let cpParams = new URLSearchParams();
    let option = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.put(this.userUrl, role, option).map(this.extractData).catch(this.handleError)
  }

  public update(user: User) {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let cpParams = new URLSearchParams();
    let option = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.put(this.userUrl, user, option).map(this.extractData).catch(this.handleError)
  }

  public getTempCity(cityName: string): Observable<CityData[]> {
    return this.http.get(this.currentCityData + cityName, null)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getAllTemp(): Observable<CityData[]> {
    return this.http.get(this.cityData).map(this.extractData).catch(this.handleError);
  }

  public getTempCurrentCity(cityName: string, value: string): Observable<CityData[]> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let cpParams = new URLSearchParams();
    cpParams.set('value', value);
    let option = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.get(this.currentCityData + cityName, option)
      .map(this.extractData)
      .catch(this.handleError);

  }

  public addCityS(cityName: string): Observable<number> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let cpParams = new URLSearchParams();
    cpParams.set('name', cityName);
    let option = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.post(this.cityUrl, null, option)
      .map(success => success.status)
      .catch(this.handleError);
  }

  public deleteCity(cityName: string): Observable<number> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let cpParams = new URLSearchParams();
    cpParams.set('name', cityName);
    let option = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.delete(this.cityUrl, option)
      .map(success => success.status)
      .catch(this.handleError);
  }

  public getCityList(): Observable<City[]> {
    return this.http.get(this.getCityListURL)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCityListForUser(): Observable<City[]> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let cpParams = new URLSearchParams();
    cpParams.set('name', this.auth.username);
    let option = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.get(this.userUrl, option).map(this.extractData).catch(this.handleError);
  }

  public refreshData(): Observable<number> {
    return this.http.post(this.cityData, null, null)
      .map(success => success.status)
      .catch(this.handleError);
  }

  public addCityToUser(cityName: string): Observable<number> {
    let header = new Headers({'Content-Type': 'application/json'})
    let param = new URLSearchParams();
    param.set('city', cityName);
    let option = new RequestOptions({headers: header, params: param});
    let body = new User();
    body.username = this.auth.username;
    return this.http.post(this.userUrl, body, option).map(status => status.status);
  }

  public deleteCityFromUserList(cityName: string): Observable<number> {
    let header = new Headers({'Content-Type': 'application/json'})
    let param = new URLSearchParams();
    param.set('city', cityName);
    let option = new RequestOptions({headers: header, params: param})
    return this.http.delete(this.userUrl + "/" + this.auth.username, option).map(status => status.status);
  }
}
