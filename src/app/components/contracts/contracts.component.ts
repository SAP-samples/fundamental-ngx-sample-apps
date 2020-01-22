import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {Contract} from '../../models/contract.model';
import {AlertService, ModalService, CalendarModule} from '@fundamental-ngx/core';
import {CreateContractModalComponent} from './create-contract-modal/create-contract-modal.component';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import { Product } from 'src/app/models/product.model';
import { CdkTable } from '@angular/cdk/table';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-contracts',
    templateUrl: './contracts.component.html',
    styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

    contracts: any;
    selected: Contract[] = [];
    filteredDataSource: Contract[];
    subscription: Subscription;
    columnHeaders: string [] = ['company', 'contact', 'type', 'value', 'status'];


    @ViewChild('table', {static: false}) table: CdkTable<{}[]>;

    dataSource: Contract[];

    dropRow(event) {
        const previousIndex = this.contracts.findIndex((d) => d === event.item.data);
        moveItemInArray(this.contracts, previousIndex, event.currentIndex);
        this.table.renderRows();
    }

    displayFunc(obj: any): string {
        return obj.company;
    }

    refresh() {
        if (this.selected.length === 0) {
            this.filteredDataSource = this.dataSource;
            } else { this.filteredDataSource = this.selected; }
        this.table.renderRows();
    }



    constructor(db: AngularFirestore, private modalService: ModalService, private alertService: AlertService) {
        (Observable.create((observer:any) => {
            setTimeout(() => {
                observer.next([{
                    company: 'Uber',
                    contact: 'Evangeline Barber',
                    status: 'completed',
                    type: '3',
                    value: '12000'
                },{
                    company: 'Airbnb',
                    contact: 'Danica Carpenter',
                    status: 'on hold',
                    type: '3',
                    value: '16443'
                },{
                    company: 'Google',
                    contact: 'Cassie Mayo',
                    status: 'dropped',
                    type: '3',
                    value: '34000'
                },{
                    company: 'Apple',
                    contact: 'Alisa Herring',
                    status: 'completed',
                    type: '3',
                    value: '10000'
                },{
                    company: 'SAP',
                    contact: 'Alonzo Ramirez',
                    status: 'completed',
                    type: '3',
                    value: '45300'
                }])
            }, 500);
        })).subscribe(data => {
            this.contracts = data;
            this.dataSource = data;
            this.filteredDataSource = data;
        });
}

    ngOnInit() {
    }

    openCreateModal(): void {
        this.modalService.open(CreateContractModalComponent, {
            data: {}
        }).afterClosed.subscribe(result => {
            if (result) {
                this.alertService.open('Create not allowed in this version.', {
                    type: 'warning'
                });
            }
        }, () => {});
    }

    openEditModal(newContract: Contract): void {
        const copyObj = Object.assign({}, newContract);
        copyObj.date_signed = newContract.date_signed.toDate();
        this.modalService.open(CreateContractModalComponent, {
            data: {
                editMode: true,
                contract: copyObj
            }
        }).afterClosed.subscribe(result => {
            if (result) {
                this.alertService.open('Edit not allowed in this version.', {
                    type: 'warning'
                });
            }
        }, () => {});
    }

    openConfirmModal(): void {
        this.modalService.open(ConfirmModalComponent).afterClosed.subscribe(result => {
            if (result) {
                this.alertService.open('Delete not allowed in this version.', {
                    type: 'warning'
                });
            }
        }, () => {});
    }

}
