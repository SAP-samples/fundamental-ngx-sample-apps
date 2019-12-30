import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Contract} from '../../models/contract.model';
import {Product} from '../../models/product.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    contracts: Observable<Contract[]>;
    products: Observable<Product[]>;

    constructor(db: AngularFirestore) {
        this.contracts = db.collection('contracts').valueChanges();
        this.products = db.collection('products').valueChanges();
        console.log(this.contracts);
    }

    ngOnInit() {
    }

}
