import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _lists: Observable<any>;
  private _columns: Observable<any>;

  constructor(private _db: AngularFirestore) {
    this._lists = _db.collection('commonLanguage').doc('lists').valueChanges();
    this._columns = _db.collection('commonLanguage').doc('columns').valueChanges();
  }

  get lists() {
    return this._lists;
  }

  get columns () {
    return this._columns;
  }
}
