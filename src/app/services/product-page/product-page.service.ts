import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductPageService {

  private _productHeader = new Observable<any>();
  private _productPageData = new Observable<any>();

  constructor(private db: AngularFirestore){
    this._productHeader = this.db.collection('main').doc('en').collection('productsPage').doc('header').valueChanges();
    this._productPageData = this.db.collection('main').doc('en').collection('productsPage').doc('columns').valueChanges();
  }

  get productHeader() {
    return this._productHeader;
  }

  get productPageData() {
    return this._productPageData;
  }

  addProduct(numOfProducts) {
    let productCollection = this.db.collection('main').doc('en').collection('productsPage').doc('header');
    const obj = {numOfContracts: numOfProducts+1};
    productCollection.update(Object.assign({}, obj));
  }
  deleteProduct(numOfProducts) {
    let productCollection = this.db.collection('main').doc('en').collection('productsPage').doc('header');
    const obj = {numOfContracts: numOfProducts-1};
    productCollection.update(Object.assign({}, obj));
  }

}
