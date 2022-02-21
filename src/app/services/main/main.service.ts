import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {LanguageService} from '../language/language.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private _main: Observable<any>;
  private _tables: Observable<any>;

  constructor(private _db: AngularFirestore, private _language: LanguageService) { 

    this._language.lang.subscribe(language => {
      this._main = _db.collection(language).doc('main').valueChanges();
    });

    this._language.lang.subscribe(language => {
      this._tables = _db.collection(language).doc('tables').valueChanges();
    });
  }

  get main() {
    return this._main;
  }

  get tables() {
    return this._tables;
  }
}
