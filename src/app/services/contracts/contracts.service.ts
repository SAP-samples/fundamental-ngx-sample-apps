import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Contract} from 'src/app/models/contract.model';
import {Subscription, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  itemsRef;
  contractObservable: Observable<Contract[]>;

  constructor(db: AngularFirestore) {
    this.itemsRef = db.collection('products').doc('contracts');
    this.contractObservable = this.itemsRef.valueChanges();
  }

  getContractsObservable() {
    return this.contractObservable;
  }
}
