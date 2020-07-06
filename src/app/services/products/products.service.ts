import { Injectable } from '@angular/core';
import {Product} from 'src/app/models/product.model';
import { Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class ProductsService {

  items: Observable<Product[]>;

  constructor(private db: AngularFirestore) {
    this.items = db.collection('main').doc('en').collection('products').valueChanges();
  }

  getItems() {
    return this.items;
  }
}
