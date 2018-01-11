import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RegistrationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegistrationServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RegistrationServiceProvider Provider');
  }

}
