import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import {RegistrationServiceProvider} from "../../providers/registration-service/registration-service";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { name: '', password: '' };

  constructor(private nav: NavController, private registrationService:RegistrationServiceProvider, private alertCtrl: AlertController) { }

    registration(){
      this.registrationService.registration(this.registerCredentials.name, this.registerCredentials.password)
        .subscribe(
          result => {
            if (result === 200) {
              this.showPopup("Success", "Account created.");
            }
            else {
              this.showPopup("Error", "Problem creating account.");
            }
          },
          error => {
            this.showPopup("Error", "Problem with creating account.");
          }
        )
    }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
