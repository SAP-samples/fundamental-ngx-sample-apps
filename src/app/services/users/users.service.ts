import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Account} from '../../models/account.model';
import {LanguageService} from '../language/language.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _users: Observable<Account[]>;
  private _userPage: Observable<any>;
  private _userTable: Observable<any>;
  private _total: Observable<any>;
  constructor(private _db: AngularFirestore, private _language: LanguageService) {
    this._language.lang.subscribe(lang => {
      this._userPage  = _db.collection(lang).doc('users').valueChanges();
    });
    this._userTable = _db.collection('commonLanguage').doc('columns').valueChanges();
    this._users = ( _db.collection('users', ref => ref.orderBy('firstName', 'asc').limit(5)).valueChanges() as Observable<Account[]>);
    const query = _db.collection('users');
    this._total = query.get();
  }

  next(lastDoc, limit) {

    // this._users = this._db.collection('main').doc('en')
    // .collection('contracts', ref => ref.where('firstName' , '==' , lastDoc)).valueChanges();

    this._users = (this._db.collection(
      'users',
      ref => ref.orderBy('firstName', 'asc').limit(limit).startAfter(lastDoc)
    ).valueChanges() as Observable<Account[]>);
  }

  prev(firstDoc, limit) {
    this._users = (this._db.collection(
      'users',
      ref => ref.orderBy('firstName', 'asc').limitToLast(limit).endBefore(firstDoc)
    ).valueChanges() as Observable<Account[]>);
  }

  get users() {
    return this._users;
  }

  get userPage(){
    return this._userPage;
  }

  get userTable(){
    return this._userTable;
  }

  get total() {
    return this._total;
  }
}
