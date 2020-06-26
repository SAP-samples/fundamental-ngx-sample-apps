import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Contract} from 'src/app/models/contract.model';
import {Subscription, Observable} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  itemsRef;
  contractObservable: Observable<Contract[]>;

  constructor(private db: AngularFirestore) {
    this.itemsRef = db.collection('products').doc('contracts');
    this.contractObservable = this.itemsRef.valueChanges();
  }

  addContract(contract: Contract) {
    const company = contract.company;
    const contact = contract.contact;
    const signed: Date =  contract.signed.toDate();
    const status = contract.status;
    const type = contract.type;
    const value = contract.value;
    const obj = {[`${company}`]: {company, contact, signed, status, type, value}};

    let contractCollection = this.db.collection('products').doc('contracts');
    contractCollection.update(Object.assign({}, obj));
  }

  deleteContract(contractName) {
    let contractCollection = this.db.collection('products').doc('contracts');
    var removeContract = contractCollection.update({
      [`${contractName}`]: firebase.firestore.FieldValue.delete()
    });
  }

  updateContract (contract:Contract) {
    const company = contract.company;
    const contact = contract.contact;
    const signed: Date =  contract.signed.toDate();
    const status = contract.status;
    const type = contract.type;
    const value = contract.value;
    const obj = {[`${company}`]: {company, contact, signed, status, type, value}};
    let contractCollection = this.db.collection('products').doc('contracts').update(obj).catch(error => {});
  }

  getContractsObservable() {
    return this.contractObservable;
  }
}
