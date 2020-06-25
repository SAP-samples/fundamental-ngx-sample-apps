import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductPageService {

  private _productData = new Observable<any>();

  constructor(private db: AngularFirestore){
    this._productData = this.db.collection('products').doc('productData').valueChanges();
  }

  get productData() {
    return this._productData;
  }
}
