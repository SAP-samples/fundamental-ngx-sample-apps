import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContractPageService {

  private _contractData = new Observable<any>();

  constructor(private db: AngularFirestore){
    this._contractData = this.db.collection('products').doc('contractData').valueChanges();
  }

  get contractData() {
    return this._contractData;
  }
}
