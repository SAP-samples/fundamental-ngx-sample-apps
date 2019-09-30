import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CdkTable } from '@angular/cdk/table';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../models/product.model';
import { AlertService, ModalService, MultiInputModule, CalendarModule } from '@fundamental-ngx/core';
import { CreateProductModalComponent } from './create-product-modal/create-product-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-products',
    templateUrl: './Products.component.html',
    styleUrls: ['./Products.component.scss']
})

export class ProductsComponent implements OnInit, OnDestroy {

    products: any;
    selected = [];
    subscription: Subscription;
    columnHeaders: string [] = ['name', 'contact', 'lob', 'user_number', 'status', 'glyph', 'remove'];


    @ViewChild('table', {static: false}) table: CdkTable<{}[]>;

    dataSource;

    dropRow(event) {
        const previousIndex = this.products.findIndex((d) => d === event.item.data);
        moveItemInArray(this.products, previousIndex, event.currentIndex);
        this.table.renderRows();
    }

    displayFunc(obj: any): string {
        return obj.name;
    }

    filterProduct(arr: { name: any; }) {

        if (this.selected.length !== 0) {
            for (const value of this.selected) {
                if (value.name === arr.name) {
                    return true;
                }
            }
        } else { return true; }
    }

    constructor(db: AngularFirestore, private modalService: ModalService, private alertService: AlertService) {
            this.subscription = db.collection('products').valueChanges().subscribe(data => {
                this.products = data;
                this.dataSource = data;
            });
    }

    ngOnInit() {

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
