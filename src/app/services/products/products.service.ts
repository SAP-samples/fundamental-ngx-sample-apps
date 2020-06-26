import { Injectable } from '@angular/core';
import {Product} from 'src/app/models/product.model';
import { Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable()
export class ProductsService {

  itemsRef;
  items: Observable<Product[]>;

  constructor(private db: AngularFirestore) {
    this.itemsRef = db.collection('products').doc('ahvJ6z4p5z6vbrPsIidI');
    this.items = this.itemsRef.valueChanges();
  }

  getItems() {
    return this.items;
  }

  addProduct(product: Product) {
    const contact = product.contact;
    const lob = product.lob;
    const name = product.name;
    const status = product.status;
    const user_number = product.user_number;
    const obj = {[`${name}`]: {contact, lob, name, status, user_number}};

    let productCollection = this.db.collection('products').doc('ahvJ6z4p5z6vbrPsIidI');
    productCollection.update(Object.assign({}, obj));
  }

  deleteProduct(productName) {
    let productCollection = this.db.collection('products').doc('ahvJ6z4p5z6vbrPsIidI');
    var removeProduct = productCollection.update({
      [`${productName}`]: firebase.firestore.FieldValue.delete()
    });
  }
}
