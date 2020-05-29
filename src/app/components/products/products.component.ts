import { Component,  ViewChild, OnDestroy, OnInit } from '@angular/core';
import { CdkTable } from '@angular/cdk/table';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../models/product.model';
import { AlertService, ModalService, MultiInputModule, CalendarModule } from '@fundamental-ngx/core';
import { CreateProductModalComponent } from './create-product-modal/create-product-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Subscription, BehaviorSubject, Subject } from 'rxjs';
import {ProductsService} from 'src/app/services/products/products.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-products',
    templateUrl: './Products.component.html',
    styleUrls: ['./Products.component.scss']
})

export class ProductsComponent implements OnDestroy, OnInit {

    subscription: Subscription;
    products: any;
    selected: Product[] = [];
    filteredDataSource: Product[] = [];
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


    constructor(public productService: ProductsService, db: AngularFirestore, private modalService: ModalService, private alertService: AlertService) {}

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

    
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.productService.getItems().subscribe(data => {
      const databaseData = Object.keys(data).map(i => data[i]);
      this.products = databaseData;
      this.dataSource = databaseData;
      this.filteredDataSource = databaseData;
    });
  }
}
