import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Account} from '../../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _users: Observable<Account[]>;

  constructor(private _db: AngularFirestore) {
    this._users = _db.collection('users', ref => ref.orderBy('users.fullName', 'asc').limit(5)).valueChanges();
  }

  next(lastDoc, limit) {

    // this._users = this._db.collection('main').doc('en')
    // .collection('contracts', ref => ref.where('users.fullName' , '==' , lastDoc)).valueChanges();

    this._users = this._db.collection(
      'users',
      ref => ref.orderBy('users.fullName', 'asc').limit(limit).startAfter(lastDoc)
    ).valueChanges();
  }

  prev(firstDoc, limit) {
    this._users = this._db.collection(
      'users',
      ref => ref.orderBy('users.fullName', 'asc').limitToLast(limit).endBefore(firstDoc)
    ).valueChanges();
  }

  get users() {
    return this._users;
  }
}
