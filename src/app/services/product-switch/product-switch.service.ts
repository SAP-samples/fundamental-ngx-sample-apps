import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductSwitchItem} from '@fundamental-ngx/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductSwitchDataService {

  private _productSwitchData = new Observable<any>();

  constructor(private db: AngularFirestore){
    this._productSwitchData = this.db.collection('main').doc('en').collection('navigation').doc('productSwitch').valueChanges();
  }

  get productSwitchData() {
    return this._productSwitchData;
  }
}
