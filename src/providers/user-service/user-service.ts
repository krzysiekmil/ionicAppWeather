import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TOKEN_NAME} from "../authentication-service/auth.constant";
import {JwtHelper} from "angular2-jwt";

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  jwtHelper: JwtHelper = new JwtHelper();
  accessToken: string;
  admin_role: boolean;
  userName: string;

  constructor() {
  }

  login(accessTokens: string) {
    let decodedToken = this.jwtHelper.decodeToken(accessTokens);
    this.admin_role = decodedToken.authorities.some(role => role === 'ADMIN_USER');
    this.userName= decodedToken.user_name.toString();
    this.accessToken = accessTokens;
    localStorage.setItem(TOKEN_NAME, this.accessToken);

  }

  logout() {
    this.accessToken = null;

    localStorage.removeItem(TOKEN_NAME);
    this.admin_role = false;
  }

  isAdmin(): boolean {
    return this.admin_role;
  }

  isUser(): boolean {
    return ((this.accessToken && !this.admin_role) || this.admin_role);
  }


}
