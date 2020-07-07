import { Injectable } from '@angular/core';
import {Product} from 'src/app/models/product.model';
import { Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {ProductPageService} from '../product-page/product-page.service';
import * as firebase from 'firebase';

@Injectable()
export class ProductsService {

  items: Observable<Product[]>;

  constructor(private db: AngularFirestore, private _productPageService: ProductPageService) {
    this.items = db.collection('main').doc('en').collection('products').valueChanges();
  }

  getItems() {
    return this.items;
  }

  addProduct(product: Product, numOfProducts:number) {
    const name = product.name;
    const contact = product.contact;
    const status = product.status;
    const user_number = product.user_number;
    const lob = product.lob;
    const obj = {name, contact, user_number, status, lob};
    let productCollection = this.db.collection('main').doc('en').collection('products').doc(name);
    productCollection.set(Object.assign({}, obj));
    this._productPageService.addProduct(numOfProducts);
  }

  updateProduct(product: Product) {
    const name = product.name;
    const contact = product.contact;
    const status = product.status;
    const user_number = product.user_number;
    const lob = product.lob;
    const obj = {name, contact, user_number, status, lob};
    let productCollection = this.db.collection('main').doc('en').collection('products').doc(name);
    productCollection.update(Object.assign({}, obj));
  }

  deleteProduct(productName, numOfProduct:number) {
    this.db.collection('main').doc('en').collection('products').doc(productName).delete();
    this._productPageService.deleteProduct(numOfProduct);
  }
}
