import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { AlertService, ModalService, MultiInputModule, CalendarModule } from '@fundamental-ngx/core';
import { CreateProductModalComponent } from './create-product-modal/create-product-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-products',
    templateUrl: './Products.component.html',
    styleUrls: ['./Products.component.scss']
})
export class ProductsComponent implements OnInit {
    products: any;

    test: Product[] = [];
    selected = [];

    displayFunc(obj: any): string {
        return obj.name;
    }

    filterProduct(arr: { name: any; }) {

        console.log('\\\\\\\\', arr, 'specific company: ', arr.name);
        console.log('Selected arry: ', this.selected[0]);
        if (this.selected.length !== 0) {
            for (const value of this.selected) {
                console.log('value: ', value);
                if (value.name === arr.name) {
                    console.log('this value: ', value.name);
                    return true;
                }
            }
        } else { return true; }
    }

    constructor(db: AngularFirestore, private modalService: ModalService, private alertService: AlertService) {
            db.collection('products').valueChanges().subscribe(data => {
                this.products = data;
                console.log(data);
                console.log(this.products);
                console.log(this.selected);
            });
    }

    ngOnInit() {

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
