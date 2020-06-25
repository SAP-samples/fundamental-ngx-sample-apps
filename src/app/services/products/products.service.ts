import { Injectable } from '@angular/core';
import {Product} from 'src/app/models/product.model';
import { Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

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
}
