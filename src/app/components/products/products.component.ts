import { Component,  ViewChild, OnDestroy, OnInit } from '@angular/core';
import { CdkTable } from '@angular/cdk/table';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../models/product.model';
import { AlertService, DialogService, MultiInputModule, CalendarModule, NotificationService } from '@fundamental-ngx/core';
import { CreateProductModalComponent } from './create-product-modal/create-product-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Subscription, BehaviorSubject, Subject } from 'rxjs';
import {ProductsService} from 'src/app/services/products/products.service';
import { takeUntil } from 'rxjs/operators';
import {CompactService} from 'src/app/services/compact/compact.service';
import {ProductPageService} from 'src/app/services/product-page/product-page.service';
import {NotificationConfirmationComponent} from 'src/app/shared/notification-confirmation/notification-confirmation.component';
import {AuthService} from 'src/app/services/auth/auth.service';

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
    totalProducts: number;
    loading: boolean = false;
    multiInputProducts: string[];
    searching: boolean = false;
    loggedIn: boolean = false;
    product: Product;
    currentPage = 1;
    firstInArray: string;
    lastInArray: string;
    limit = 5;

    @ViewChild('table', {static: false}) table: CdkTable<{}[]>;

    dataSource: Product[];
    filteredDatasource: Product[];

    constructor(
      public productService: ProductsService, 
      private dialogService: DialogService, 
      private auth: AuthService,
      private notificationService: NotificationService,
      private productPageService: ProductPageService,
      compactService: CompactService) {
        compactService.compact.subscribe(result => {
          this.globalCompact = result;
        });
    }

    openCreateModal(): void {
        this.dialogService.open(CreateProductModalComponent, {
            data: {
              editMode: false,
              fields: this.columnHeaders,
              compact: this.globalCompact
            }
        }).afterClosed.subscribe(result => {
          if (result){
            if (this.loggedIn) {
              this.product = result;
              const notif = this.notificationService.open(
                NotificationConfirmationComponent,
                {
                  data: {
                  company: result.name,
                  contact: result.contact,
                  status: result.status
                  },
                  type: 'success'
                });
              notif.afterClosed.subscribe( result => {
                  this.productService.addProduct(this.product);
                });
            }
          } else {
            this.notificationService.open(NotificationConfirmationComponent, {
              data: {
                  invalid: true
              },
              size: 'm',
              type: 'error'
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
            if (this.loggedIn){
              this.product = result;
              const notificationService = this.notificationService.open(NotificationConfirmationComponent, {
                data: {
                    company: result.name,
                    contact: result.contact,
                    status: result.status,
                },
                size: 'm',
                type: 'warning'
            });
  
              notificationService.afterClosed.subscribe(
                (result) => {
                    if (result == 'OK'){
                      this.productService.updateProduct(this.product);
                    }
                },
                (error) => {
                }
            );
            } else {
              this.notificationService.open(NotificationConfirmationComponent, {
                data: {
                    invalid: true
                },
                size: 'm',
                type: 'error'
              });
            }
        }
      }, () => { });
    }

    openConfirmModal(name): void {
        this.dialogService.open(ConfirmModalComponent).afterClosed.subscribe(result => {
            if (result) {
              if (this.loggedIn) {
                this.dialogService.open(ConfirmModalComponent).afterClosed.subscribe(result => {
                  if (result) {
                    this.productService.deleteProduct(name);
                  }
                });
              } else {
                this.notificationService.open(NotificationConfirmationComponent, {
                  data: {
                      invalid: true
                  },
                  size: 'm',
                  type: 'error'
                });
              }
            }
        });
    }

    
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.loggedIn = this.auth.isLoggedIn;
    this.subscription = this.productService.products.subscribe(data => {
      this.lastInArray = data[(data.length - 1)].name;
      this.firstInArray = data[0].name;
      const databaseData = Object.keys(data).map(i => data[i]);
      this.products = databaseData;
  });

    this.productService.totalQueryProduct.subscribe(data => {this.totalProducts = data.size; });


    this.productPageService.productHeader.subscribe(data => {
      this.productsPage = {title: data.title, description: data.description};
      this.multiInputProducts = data.products;
    });

    this.productPageService.productPageData.subscribe(data => {
      this.columnHeaders = data.columns;
    });

    this.auth.userObserLoginObservable.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
    });
  }

  newPageClicked(event) {
    this.loading = true;
    if (event === this.currentPage + 1 || event === this.currentPage - 1 ) {
      if (this.currentPage === event) {

      } else {
        if (this.searching === false) {
          if (event === this.currentPage + 1) {
            this.paginator('plus', this.productService.next(this.lastInArray, this.limit));
          } else if (event === this.currentPage - 1) {
            this.paginator('minus', this.productService.prev(this.lastInArray, this.limit));
          }
          this.productService.totalQueryProduct.subscribe(data => {this.totalProducts = data.size; });
        } else {
          if (event === this.currentPage + 1) {
            this.paginator('plus', this.productService.nextSearch(this.lastInArray, this.selected, this.limit));
          } else if (event === this.currentPage - 1) {
            this.paginator('minus', this.productService.prevSearch(this.firstInArray, this.selected, this.limit));
          }
          this.productService.totalQueryProduct.subscribe(data => {this.totalProducts = data.size; });
        }
      }
    }
    this.loading = false;
  }

  private paginator(operator: string, callback: void) {
    if (operator === 'plus') {
      this.subscription.unsubscribe();
      this.currentPage = this.currentPage + 1;
      callback;
      this.subscription = this.productService.products.subscribe(data => {
        this.lastInArray = data[(data.length - 1)].name;
        this.firstInArray = data[0].name;
        const databaseData = Object.keys(data).map(i => data[i]);
        this.products = databaseData;
      });
    } else if (operator === 'minus') {
      this.currentPage = this.currentPage - 1;
      callback;
      this.subscription.unsubscribe();
      this.subscription = this.productService.products.subscribe(data => {
        this.lastInArray = data[(data.length - 1)].name;
        this.firstInArray = data[0].name;
        const databaseData = Object.keys(data).map(i => data[i]);
        this.products = databaseData;
      });
    }
  }

  dropRow(event) {
    const previousIndex = this.products.findIndex((d) => d === event.item.data);
    moveItemInArray(this.products, previousIndex, event.currentIndex);
    this.table.renderRows();
}

refresh() {
  if (this.selected.length === 0) {
      this.currentPage = 1;
      this.filteredDataSource = this.dataSource;
      this.searching = false;
      } else {
        this.searching = true;
        this.subscription.unsubscribe();
        this.productService.searchQuery(this.selected, this.limit);
        this.productService.totalQueryProduct.subscribe(data => {this.totalProducts = data.size; });
        this.subscription =  this.productService.products.subscribe(data => {
          this.lastInArray = data[(data.length - 1)].name;
          this.firstInArray = data[0].name;
          const databaseData = Object.keys(data).map(i => data[i]);
          this.products = databaseData;
        });
      }
  this.table.renderRows();
}
}
