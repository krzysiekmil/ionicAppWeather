import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from "@angular/http";
import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from "./auth.constant";
import {Platform} from "ionic-angular";

@Injectable()
export class AuthenticationService {
  static AUTH_TOKEN = '/oauth/token';
  static AUTH_TOKEN_MOBILE = 'http://default-environment.pbsfzikagw.eu-central-1.elasticbeanstalk.com/oauth/token';
  username: string;

  constructor(private http: Http, public plt: Platform) {
  }

  login(username: string, password: string) {
    this.username = username;
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD))
    let options = new RequestOptions({headers:headers});
    if (this.plt.is('android') || this.plt.is('ios')) {
      return this.http.post(AuthenticationService.AUTH_TOKEN_MOBILE, body, options)
        .map(res => res.json())
        .map((res: any) => {
          if (res.access_token) {
            return res.access_token;
          }
          return null;
        });
    }
    else {
      return this.http.post(AuthenticationService.AUTH_TOKEN, body, options)
        .map(res => res.json())
        .map((res: any) => {
          if (res.access_token) {
            return res.access_token;
          }
          return null;
        });
    }
  }
}
