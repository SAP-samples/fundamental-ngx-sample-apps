import { Component,  ViewChild, OnDestroy } from '@angular/core';
import { CdkTable } from '@angular/cdk/table';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../models/product.model';
import { AlertService, ModalService, MultiInputModule, CalendarModule } from '@fundamental-ngx/core';
import { CreateProductModalComponent } from './create-product-modal/create-product-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Behavior } from 'popper.js';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateContractModalComponent } from '../contracts/create-contract-modal/create-contract-modal.component';

@Component({
    selector: 'app-products',
    templateUrl: './Products.component.html',
    styleUrls: ['./Products.component.scss']
})

export class ProductsComponent implements  OnDestroy {

    products: any;
    selected: Product[] = [];
    filteredDataSource: Product[] = [];
    subscription: Subscription;
    columnHeaders: string [] = ['name', 'contact', 'lob', 'user_number', 'status'];


    @ViewChild('table', {static: false}) table: CdkTable<{}[]>;

    dataSource: Product[];
    filteredDatasource: Product[];

    dropRow(event) {
        const prevIndex = this.filteredDataSource.findIndex((d) => d === event.item.data);
        moveItemInArray(this.filteredDataSource, prevIndex, event.currentIndex);
        this.table.renderRows();
    }

    refresh() {
        if (this.selected.length === 0) {
            this.filteredDataSource = this.dataSource;
            } else { this.filteredDataSource = this.selected; }
        this.table.renderRows();
    }


    displayFunc(obj: any): string {
        return obj.name;
    }


    constructor(db: AngularFirestore, public dialog: MatDialog, private _snackBar: MatSnackBar) {
        this.subscription = db.collection('products').valueChanges().subscribe(data => {
            this.products = data;
            this.dataSource = data;
            this.filteredDataSource = data;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


    openCreateModal(): void {
        const dialogRef = this.dialog.open(CreateProductModalComponent,{
            width: '30rem'
        });
    
        dialogRef.afterClosed().subscribe(result => {
            
            if (result) {
                this._snackBar.open('Create not allowed in this version.', '', {
                    duration: 2000,
                  });
            }
        });
      }

}
