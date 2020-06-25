import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SideNavigationService {
  private _sideNavigationData = new Observable<any>();

  constructor(private db: AngularFirestore){
    this._sideNavigationData = this.db.collection('products').doc('sideNavigationData').valueChanges();
  }

  get sideNavigationData() {
    return this._sideNavigationData;
  }
}
