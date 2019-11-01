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
    columnHeaders: string [] = ['name', 'contact', 'lob', 'user_number', 'status', 'glyph', 'remove'];


    @ViewChild('table', {static: false}) table: CdkTable<{}[]>;

    dataSource: Product[];
    filteredDatasource: Product[];

    dropRow(event) {
        const previousIndex = this.products.findIndex((d) => d === event.item.data);
        moveItemInArray(this.products, previousIndex, event.currentIndex);
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


    constructor(db: AngularFirestore, private modalService: ModalService, private alertService: AlertService) {
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
        this.modalService.open(CreateProductModalComponent, {
            data: {}
        }).afterClosed.subscribe(result => {
            if (result) {
                this.alertService.open('Create not allowed in this version.', {
                    type: 'warning'
                });
            }
        }, () => { });
    }

    openEditModal(newProduct: Product): void {
        this.modalService.open(CreateProductModalComponent, {
            data: {
                editMode: true,
                product: newProduct
            }
        }).afterClosed.subscribe(result => {
            if (result) {
                this.alertService.open('Edit not allowed in this version.', {
                    type: 'warning'
                });
            }
        }, () => { });
    }

    openConfirmModal(): void {
        this.modalService.open(ConfirmModalComponent).afterClosed.subscribe(result => {
            if (result) {
                this.alertService.open('Delete not allowed in this version.', {
                    type: 'warning'
                });
            }
        }, () => { });
    }

}
