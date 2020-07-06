import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContractPageService {

  private _contractHeader = new Observable<any>();
  private _contractCol = new Observable<any>();


  constructor(private db: AngularFirestore){
    this._contractHeader = this.db.collection('main').doc('en').collection('contractsPage').doc('header').valueChanges();
    this._contractCol = this.db.collection('main').doc('en').collection('contractsPage').doc('columns').valueChanges();
  }

  get contractHeader() {
    return this._contractHeader;
  }

  get contractColumns() {
    return this._contractCol;
  }

  addContract(numOfContract:number) {
    let contractCollection = this.db.collection('main').doc('en').collection('contractsPage').doc('header');
    const obj = {numOfContracts: numOfContract+1};
    contractCollection.update(Object.assign({}, obj));
  }

  deleteContract(numOfContract:number) {
    let contractCollection = this.db.collection('main').doc('en').collection('contractsPage').doc('header');
    const obj = {numOfContracts: numOfContract-1};
    contractCollection.update(Object.assign({}, obj));
  }
}
