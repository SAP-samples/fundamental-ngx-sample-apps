import { Component,  ViewChild, OnDestroy, OnInit } from '@angular/core';
import { CdkTable } from '@angular/cdk/table';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../models/product.model';
import { AlertService, DialogService, MultiInputModule, CalendarModule } from '@fundamental-ngx/core';
import { CreateProductModalComponent } from './create-product-modal/create-product-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Subscription, BehaviorSubject, Subject } from 'rxjs';
import {ProductsService} from 'src/app/services/products/products.service';
import { takeUntil } from 'rxjs/operators';
import {CompactService} from 'src/app/services/compact/compact.service';
import {ProductPageService} from 'src/app/services/product-page/product-page.service';

@Component({
    selector: 'app-products',
    templateUrl: './Products.component.html',
    styleUrls: ['./Products.component.scss']
})

export class ProductsComponent implements OnDestroy, OnInit {

    globalCompact: boolean;
    subscription: Subscription;
    products: any;
    productsPage: {title: string, description: string} = {title: '', description: ''};
    selected: Product[] = [];
    filteredDataSource: Product[] = [];
    columnHeaders: string [];


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


    constructor(
      public productService: ProductsService, 
      private dialogService: DialogService, 
      private alertService: AlertService,
      private productPageService: ProductPageService,
      compactService: CompactService) {
        compactService.compact.subscribe(result => {
          this.globalCompact = result;
        })
    }

    openCreateModal(): void {
        this.dialogService.open(CreateProductModalComponent, {
            data: {
              editMode: false,
              fields: this.columnHeaders,
              compact: this.globalCompact
            }
        }).afterClosed.subscribe(result => {
            if (result) {
                this.alertService.open('Create not allowed in this version.', {
                    type: 'warning'
                });
            }
        }, () => { });
    }

    openEditModal(newProduct: Product): void {
        this.dialogService.open(CreateProductModalComponent, {
            data: {
                editMode: true,
                fields: this.columnHeaders,
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
        this.dialogService.open(ConfirmModalComponent).afterClosed.subscribe(result => {
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

    this.productPageService.productData.subscribe(data => {
      this.productsPage = {title: data.title, description: data.description};
      this.columnHeaders = data.columns;
    })
  }
}
