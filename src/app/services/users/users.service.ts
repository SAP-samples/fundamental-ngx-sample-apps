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

  search(...args: any[]) {//args[0]=limit, args[1]=sortDir
    if (args[1] === 'desc') {
      this._users = (this._db.collection('users', ref => ref.orderBy('firstName', 'desc').limit(args[0]))
      .valueChanges() as Observable<Account[]>);
    } else {
      this._users = (this._db.collection('users', ref => ref.orderBy('firstName', 'asc').limit(args[0]))
      .valueChanges() as Observable<Account[]>);
    }
  }

  next(...args: any[]) {//args[0]=lastDoc , args[1]=limit
    if (args[2] === 'desc') {
      this._users = (this._db.collection('users',ref => ref.orderBy('firstName', 'desc').limit(args[1]).startAfter(args[0])
      ).valueChanges() as Observable<Account[]>);
    }
    else {
      this._users = (this._db.collection('users',ref => ref.orderBy('firstName', 'asc').limit(args[1]).startAfter(args[0])
      ).valueChanges() as Observable<Account[]>);
    }
  }

  prev(...args: any[]) {//args[0]=firstDoc , args[1]=limit
    if (args[2] === 'desc') {
      this._users = (this._db.collection('users', ref => ref.orderBy('firstName', 'desc').limitToLast(args[1]).endBefore(args[0])
      ).valueChanges() as Observable<Account[]>);
    } else {
      this._users = (this._db.collection('users', ref => ref.orderBy('firstName', 'asc').limitToLast(args[1]).endBefore(args[0])
      ).valueChanges() as Observable<Account[]>);
    }
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
