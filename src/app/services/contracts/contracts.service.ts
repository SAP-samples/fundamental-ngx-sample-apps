import { Injectable } from '@angular/core';
import {AngularFirestore, QuerySnapshot} from '@angular/fire/firestore';
import {Contract} from 'src/app/models/contract.model';
import {Subscription, Observable} from 'rxjs';
import * as firebase from 'firebase';
import {ContractPageService} from '../contract-page/contract-page.service';
import {firestore} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  contractObservable: Observable<Contract[]>;
  private _totalQueryContract: Observable<any>

  constructor(private db: AngularFirestore, private _contractPageService: ContractPageService) {
    this.contractObservable = db.collection('contracts',
    ref => ref.orderBy('company', 'asc').limit(5)).valueChanges();
    this.changeTotalObservable();
  }

  searchQuery(...args: any[]) { //args[0] = limit, args[1] = query
    if (args[1]) {
      console.log('entering')
      this.contractObservable = this.db
      .collection('contracts', ref => ref.where('company' , 'in' , args[1])
      .orderBy(firebase.firestore.FieldPath.documentId(), 'asc').limit(args[0])).valueChanges();
      this.changeTotalObservable(args[1]);
    }
    else {
      this.contractObservable = this.db
      .collection('contracts', ref => ref.orderBy(firebase.firestore.FieldPath.documentId(), 'asc').limit(args[0])).valueChanges();
      this.changeTotalObservable();
    }
  }

  nextSearch(...args: any[]) {  //args[0] = last doc, args[1] = limit, args[2] = query
    if (args[2]) {
      this.contractObservable = this.db
      .collection('contracts', ref => ref.where('company' , 'in' , args[2])
      .orderBy(firebase.firestore.FieldPath.documentId(), 'asc').limit(args[1]).startAfter(args[0]))
      .valueChanges();
      this.changeTotalObservable(args[2]);
    } else {
      this.contractObservable = this.db
      .collection('contracts', ref => ref.orderBy(firebase.firestore.FieldPath.documentId(), 'asc').limit(args[1]).startAfter(args[0]))
      .valueChanges();
      this.changeTotalObservable();
    }
  }

  prevSearch(...args: any[]) {//args[0] = first doc, args[1] = limit, args[2] = query
    if (args[2]) {
      this.contractObservable = this.db
      .collection('contracts', ref => ref.where('company' , 'in' , args[2])
      .orderBy(firebase.firestore.FieldPath.documentId(), 'asc').limitToLast(args[1]).endBefore(args[0])).valueChanges();
      this.changeTotalObservable(args[2]);
    } else {
      this.contractObservable = this.db
      .collection('contracts', ref => ref.orderBy(firebase.firestore.FieldPath.documentId(), 'asc').limitToLast(args[1]).endBefore(args[0]))
      .valueChanges();
      this.changeTotalObservable();
    }
  }

  next(lastDoc, limit) {
    this.contractObservable = this.db
    .collection('contracts', ref => ref.orderBy('company', 'asc').limit(limit).startAfter(lastDoc)).valueChanges();
    this.changeTotalObservable();
  }

  prev(firstDoc, limit) {
    this.contractObservable = this.db
    .collection('contracts', ref => ref.orderBy('company', 'asc').limitToLast(limit).endBefore(firstDoc)).valueChanges();
    this.changeTotalObservable();
  }

  addContract(contract: Contract) {
    const company = contract.company;
    const contact = contract.contact;
    const signed: Date =  contract.signed.toDate();
    const status = contract.status;
    const type = contract.type;
    const value = contract.value;
    const obj = {company, contact, signed, status, type, value};

    let contractCollection = this.db.collection('contracts').doc(company);
    contractCollection.set(Object.assign({}, obj));
    this.db.collection('contractsPage').doc('header').update({
      contracts: firestore.FieldValue.arrayUnion(company)
    });
  }

  deleteContract(contractName) {
    this.db.collection('contracts').doc(contractName).delete();
    this.db.collection('contractsPage').doc('header').update({
      contracts: firebase.firestore.FieldValue.arrayRemove(contractName)
    });
  }

  updateContract(contract: Contract) {
    const company = contract.company;
    const contact = contract.contact;
    const signed: Date =  contract.signed.toDate();
    const status = contract.status;
    const type = contract.type;
    const value = contract.value;
    const obj = {company, contact, signed, status, type, value};
    let contractCollection = this.db.collection('contracts').doc(company);
    contractCollection.update(Object.assign({}, obj));
  }

  getContractsObservable() {
    return this.contractObservable;
  }

  private changeTotalObservable(...args: any[]) {
    if (args[0]) {
      let query = this.db.collection('contracts', ref => ref.where('company' , 'in' , args[0]));
      this._totalQueryContract = query.get();
    } else {
      let query = this.db.collection('contracts');
      this._totalQueryContract = query.get();
    }
  }

  get totalQueryContract () {
    return this._totalQueryContract;
  }
}
