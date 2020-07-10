import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _account: Observable<any> = new Observable<any>();
  private id;

  constructor(private _db: AngularFirestore, private cookie: CookieService) {
    const user = this.cookie.get('userid');
    if (user) {
      this.id = user;
      this._account = this._db.collection('main').doc('en')
      .collection('contracts', ref => ref.where('id' , '==' , this.id)).valueChanges();
    }
  }

  get account() {
    return this._account;
  }
}
