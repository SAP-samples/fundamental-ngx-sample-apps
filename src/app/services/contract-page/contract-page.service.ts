import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {LanguageService} from '../language/language.service';

@Injectable({
  providedIn: 'root'
})
export class ContractPageService {

  private _contractHeader = new Observable<any>();
  private _contractCol = new Observable<any>();


  constructor(private db: AngularFirestore, private _lang:LanguageService){
    this._lang.lang.subscribe(language => {
      this._contractHeader = this.db.collection('main').doc(language).collection('contractsPage').doc('header').valueChanges();
      this._contractCol = this.db.collection('main').doc(language).collection('contractsPage').doc('columns').valueChanges();
    });
  }

  get contractHeader() {
    return this._contractHeader;
  }

  get contractColumns() {
    return this._contractCol;
  }
}
