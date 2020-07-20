import { Injectable } from '@angular/core';
import {Product} from 'src/app/models/product.model';
import { Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {ProductPageService} from '../product-page/product-page.service';
import * as firebase from 'firebase';
import {firestore} from 'firebase';

@Injectable()
export class ProductsService {

  _products: Observable<Product[]>;
  private _totalQueryProduct: Observable<any>;

  constructor(private db: AngularFirestore, private _productPageService: ProductPageService) {
    this._products = db.collection('products',
    ref => ref.orderBy('name', 'asc').limit(5)).valueChanges();

    let query = db.collection('products',
    ref => ref.orderBy('name', 'asc'));
    this._totalQueryProduct = query.get();
  }

  get products() {
    return this._products;
  }

  addProduct(product: Product) {
    const name = product.name;
    const contact = product.contact;
    const status = product.status;
    const user_number = product.user_number;
    const lob = product.lob;
    const obj = {name, contact, user_number, status, lob};
    let productCollection = this.db.collection('products').doc(name);
    productCollection.set(Object.assign({}, obj));
    this.db.collection('productsPage').doc('header').update({
      products: firestore.FieldValue.arrayUnion(name)
    });
  }

  updateProduct(product: Product) {
    const name = product.name;
    const contact = product.contact;
    const status = product.status;
    const user_number = product.user_number;
    const lob = product.lob;
    const obj = {name, contact, user_number, status, lob};
    let productCollection = this.db.collection('products').doc(name);
    productCollection.update(Object.assign({}, obj));
    this.db.collection('productsPage').doc('header').update({
      products: firebase.firestore.FieldValue.arrayRemove(name)
    });
  }

  deleteProduct(productName) {
    this.db.collection('products').doc(productName).delete();
  }

  searchQuery(queryValue, limit) {
    this._products = this.db
    .collection('products', ref => ref.where('name' , 'in' , queryValue)
    .orderBy(firebase.firestore.FieldPath.documentId(), 'asc').limit(limit)).valueChanges();

    let query = this.db
    .collection('products', ref => ref.where('name' , 'in' , queryValue));
    this._totalQueryProduct = query.get();
  }

  nextSearch(lastDoc, queryValue, limit) {
    this._products = this.db
    .collection('products', ref => ref.where('name' , 'in' , queryValue)
    .orderBy(firebase.firestore.FieldPath.documentId(), 'asc').limit(limit).startAfter(lastDoc)).valueChanges();

    let query = this.db
    .collection('products', ref => ref.where('name' , 'in' , queryValue));
    this._totalQueryProduct = query.get();
  }

  prevSearch(firstDoc, queryValue, limit) {
    this._products = this.db
    .collection('products', ref => ref.where('name' , 'in' , queryValue)
    .orderBy(firebase.firestore.FieldPath.documentId(), 'asc').limitToLast(limit).endBefore(firstDoc)).valueChanges();

    let query = this.db
    .collection('products', ref => ref.where('name' , 'in' , queryValue));
    this._totalQueryProduct = query.get();
  }

  next(lastDoc, limit) {
    this._products = this.db
    .collection('products', ref => ref.orderBy('name', 'asc').limit(limit).startAfter(lastDoc)).valueChanges();

    let query = this.db.collection('products', ref => ref.orderBy('name', 'asc'));
    this._totalQueryProduct = query.get();
  }

  prev(firstDoc, limit) {
    this._products = this.db
    .collection('products', ref => ref.orderBy('name', 'asc').limitToLast(limit).endBefore(firstDoc)).valueChanges();

    let query = this.db.collection('products', ref => ref.orderBy('name', 'asc'));
    this._totalQueryProduct = query.get();
  }

  get totalQueryProduct () {
    return this._totalQueryProduct;
  }
}
