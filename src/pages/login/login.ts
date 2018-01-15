import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';
import {AuthService} from '/home/krzysiek/ionicApp/src/providers/auth-service/auth-service';
import {isUndefined} from "util";
import {AuthenticationService} from "../../providers/authentication-service/authentication-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userName:string;
  loading: Loading;
  registerCredentials = {name: '', password: '' };
  result:any;

  constructor(private nav: NavController, private auth: AuthService,
              private alertCtrl: AlertController, private loadingCtrl: LoadingController,
              private authenticationService:AuthenticationService,
              private userService: UserServiceProvider) {
    this.logout();
  }

  public createAccount() {
    this.nav.push('RegisterPage');
  }
  test(){
  this.nav.setRoot('MenuPage')
  }


  login() {
    this.showLoading();
    this.userName = this.registerCredentials.name;
    this.authenticationService.login(this.registerCredentials.name, this.registerCredentials.password)
      .subscribe(
        result => {
          this.result = result;
          if (!isUndefined(result)) {
            this.userService.login(result.toString());
            this.nav.setRoot('MenuPage');
          }
          else
          {
            this.showError("Access Denied")
          }
        },
        error => {
          this.showError("Access Denied");
          console.log(error.status + " " + error.statusText);
        }
      )
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  public logout() {
    this.userService.logout();
  }
}
