import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AngularFireDatabase} from "angularfire2/database";
import {City} from "../../pages/model/city";

/*
  Generated class for the MessagingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagingProvider {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);

  constructor(public afd: AngularFireDatabase) {

  }

  getPermision() {
    this.messaging.requestPermission().then(() => {
      console.log('jest');
      return this.messaging.getToken();
    })
      .then(token => {
        console.log(token);
        this.currentMessage = token;
      })
      .catch(err => {
        console.log(err);
      })
  }

  addItem() {
    console.log('robie');
    let city = new City();
    city.name = 'super';
    city.id = 1;
    this.afd.list('/shoppingItem/').push(city)
  }


}
