import { Injectable } from '@angular/core';
import {AngularFirestore, QuerySnapshot} from '@angular/fire/firestore';
import {Contract} from 'src/app/models/contract.model';
import {Subscription, Observable} from 'rxjs';
import * as firebase from 'firebase';
import {ContractPageService} from '../contract-page/contract-page.service';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  contractObservable: Observable<Contract[]>;
  private _totalQueryContract: Observable<any>

  constructor(private db: AngularFirestore, private _contractPageService: ContractPageService) {
    this.contractObservable = db.collection('main').doc('en').collection('contracts',
    ref => ref.orderBy('company', 'asc').limit(5)).valueChanges();

    let query = db.collection('main').doc('en').collection('contracts',
    ref => ref.orderBy('company', 'asc'));
    this._totalQueryContract = query.get();
  }

  searchQuery(queryValue, limit) {
    this.contractObservable = this.db.collection('main').doc('en')
    .collection('contracts', ref => ref.where('company' , 'in' , queryValue)
    .orderBy(firebase.firestore.FieldPath.documentId(), 'asc').limit(limit)).valueChanges();

    let query = this.db.collection('main').doc('en')
    .collection('contracts', ref => ref.where('company' , 'in' , queryValue));
    this._totalQueryContract = query.get();
  }

  nextSearch(lastDoc, queryValue, limit) {
    this.contractObservable = this.db.collection('main').doc('en')
    .collection('contracts', ref => ref.where('company' , 'in' , queryValue)
    .orderBy(firebase.firestore.FieldPath.documentId(), 'asc').limit(limit).startAfter(lastDoc)).valueChanges();

    let query = this.db.collection('main').doc('en')
    .collection('contracts', ref => ref.where('company' , 'in' , queryValue));
    this._totalQueryContract = query.get();
  }

  prevSearch(firstDoc, queryValue, limit) {
    this.contractObservable = this.db.collection('main').doc('en')
    .collection('contracts', ref => ref.where('company' , 'in' , queryValue)
    .orderBy(firebase.firestore.FieldPath.documentId(), 'asc').limitToLast(limit).endBefore(firstDoc)).valueChanges();

    let query = this.db.collection('main').doc('en')
    .collection('contracts', ref => ref.where('company' , 'in' , queryValue));
    this._totalQueryContract = query.get();
  }

  next(lastDoc, limit) {
    this.contractObservable = this.db.collection('main').doc('en')
    .collection('contracts', ref => ref.orderBy('company', 'asc').limit(limit).startAfter(lastDoc)).valueChanges();

    let query = this.db.collection('main').doc('en').collection('contracts', ref => ref.orderBy('company', 'asc'));
    this._totalQueryContract = query.get();
  }

  prev(firstDoc, limit) {
    this.contractObservable = this.db.collection('main').doc('en')
    .collection('contracts', ref => ref.orderBy('company', 'asc').limitToLast(limit).endBefore(firstDoc)).valueChanges();

    let query = this.db.collection('main').doc('en').collection('contracts', ref => ref.orderBy('company', 'asc'));
    this._totalQueryContract = query.get();
  }

  addContract(contract: Contract) {
    const company = contract.company;
    const contact = contract.contact;
    const signed: Date =  contract.signed.toDate();
    const status = contract.status;
    const type = contract.type;
    const value = contract.value;
    const obj = {company, contact, signed, status, type, value};

    let contractCollection = this.db.collection('main').doc('en').collection('contracts').doc(company);
    contractCollection.set(Object.assign({}, obj));
  }

  deleteContract(contractName) {
    this.db.collection('main').doc('en').collection('contracts').doc(contractName).delete();
  }

  updateContract(contract: Contract) {
    const company = contract.company;
    const contact = contract.contact;
    const signed: Date =  contract.signed.toDate();
    const status = contract.status;
    const type = contract.type;
    const value = contract.value;
    const obj = {company, contact, signed, status, type, value};
    let contractCollection = this.db.collection('main').doc('en').collection('contracts').doc(company);
    contractCollection.update(Object.assign({}, obj));
  }

  getContractsObservable() {
    return this.contractObservable;
  }

  get totalQueryContract () {
    return this._totalQueryContract;
  }
}
