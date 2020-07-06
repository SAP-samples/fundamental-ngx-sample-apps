import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Contract} from 'src/app/models/contract.model';
import {Subscription, Observable} from 'rxjs';
import * as firebase from 'firebase';
import {ContractPageService} from '../contract-page/contract-page.service';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  contractObservable: Observable<Contract[]>;

  constructor(private db: AngularFirestore, private _contractPageService: ContractPageService) {
    this.contractObservable = db.collection('main').doc('en').collection('contracts').valueChanges();
  }

  addContract(contract: Contract, numOfContract:number) {
    const company = contract.company;
    const contact = contract.contact;
    const signed: Date =  contract.signed.toDate();
    const status = contract.status;
    const type = contract.type;
    const value = contract.value;
    const obj = {[`${company}`]: {company, contact, signed, status, type, value}};

    let contractCollection = this.db.collection('products').doc('contracts');
    contractCollection.update(Object.assign({}, obj));
    this._contractPageService.addContract(numOfContract);
  }

  deleteContract(contractName, numOfContract:number) {
    let contractCollection = this.db.collection('products').doc('contracts');
    contractCollection.update({
      [`${contractName}`]: firebase.firestore.FieldValue.delete()
    });
    this._contractPageService.deleteContract(numOfContract);
  }

  getContractsObservable() {
    return this.contractObservable;
  }
}
