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
    headers = ['Company', 'Contact', 'Line of Business', 'Status'];
    labels = {
        products: "Products",
        productsDescription: "Quick information about company products.",
        contracts: "Contracts",
        contractsDescription: "Quick information about company contracts.",
    };

    constructor(db: AngularFirestore) {
        this.products = Observable.create((observer:any)=> {
            setTimeout(() => {
                observer.next([{
                    contact: 'Kristina Chambers',
                    lob: 'C/4HANA',
                    name: 'SAP',
                    status: 'completed',
                    user_number: 1
                }, {
                    contact: 'Caitlin Duncan',
                    lob: 'C/4HANA',
                    name: 'IBM',
                    status: 'on hold',
                    user_number: 1
                }, {
                    contact: 'Melody Nixon',
                    lob: 'S/4HANA',
                    name: 'Nestle',
                    status: 'dropped',
                    user_number: 1
                }, {
                    contact: 'Riley Raymond',
                    lob: 'SAP Concur',
                    name: 'Nike',
                    status: 'completed',
                    user_number: 1
                }, {
                    contact: 'Dante Duran',
                    lob: 'SAP Ariba',
                    name: 'Adidas',
                    status: 'in progress',
                    user_number: 1
                }]);
                
            }, 400);
        });

        this.contracts = Observable.create((observer:any) => {
            setTimeout(() => {
                observer.next([{
                    company: 'Uber',
                    contact: 'Evangeline Barber',
                    status: 'completed',
                    type: '3',
                    value: '12 000'
                },{
                    company: 'Airbnb',
                    contact: 'Danica Carpenter',
                    status: 'on hold',
                    type: '3',
                    value: '16 443'
                },{
                    company: 'Google',
                    contact: 'Cassie Mayo',
                    status: 'dropped',
                    type: '3',
                    value: '34 000'
                },{
                    company: 'Apple',
                    contact: 'Alisa Herring',
                    status: 'completed',
                    type: '3',
                    value: '10 000'
                },{
                    company: 'SAP',
                    contact: 'Alonzo Ramirez',
                    status: 'completed',
                    type: '3',
                    value: '45 300'
                }])
            }, 900);
        });
    }

    ngOnInit() {
    }

}
