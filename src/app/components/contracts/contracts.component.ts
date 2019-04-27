import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-contracts',
    templateUrl: './contracts.component.html',
    styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

    contracts: Observable<any[]>;

    constructor(db: AngularFirestore) {
        this.contracts = db.collection('contracts').valueChanges();
    }

    ngOnInit() {
    }

}
