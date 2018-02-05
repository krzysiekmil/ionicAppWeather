import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase';
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the MessagingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagingProvider {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth,private http:Http) {
  }

  updateToken(token) {
    this.afAuth.authState.subscribe(user => {
      if (!user) return;
      const data = {[user.uid]: token}
      this.db.object('fcmTokens/').update(data)
    })
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log(token)
        this.updateToken(token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      this.currentMessage.next(payload)
    });
  }

  sendNotification(message:string): Observable<number>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Basic NzQ4YWM2MGYtMWIyMy00NTRjLWJkZTItMzhhMDQzZThiMmUw');
    let option = new RequestOptions();
    option.headers=headers;
    return this.http.post('https://onesignal.com/api/v1/notifications',{
      "app_id" :"94a9b0d3-a38a-4644-b2a5-cd46d6b2c304",
      "contents" : {"en":message},
      "included_segments" : ["All"]
    },option).map(success=>success.status);
  }



}
