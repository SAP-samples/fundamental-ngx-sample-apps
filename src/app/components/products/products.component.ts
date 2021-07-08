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
import {LanguageService} from 'src/app/services/language/language.service';
import {MainService} from 'src/app/services/main/main.service';
import {CommonService} from 'src/app/services/common/common.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnDestroy, OnInit {
    mobile = true;
    globalCompact: boolean;
    subscription: Subscription;
    products: any;
    productsPage: {title: string, description: string} = {title: '', description: ''};
    selected: Product[] = [];
    filteredDataSource: Product[] = [];
    columnHeaders: string [];
    tableHeaders: string [];
    totalProducts: number;
    language: 'en' | 'fr' = 'en';
    loading: boolean = false;
    multiInputProducts: string[];
    searching: boolean = false;
    loggedIn: boolean = false;
    product: Product;
    currentPage = 1;
    firstInArray: string;
    lastInArray: string;
    limit = 5;
    itemsPerPageOptions: number[] = [1, 5, 10];

    @ViewChild('table', {static: false}) table: CdkTable<{}[]>;

    dataSource: Product[];
    filteredDatasource: Product[];

    constructor(
      private _languageService: LanguageService,
      private _main: MainService,
      private _common: CommonService,
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

    ngOnInit() {
      if (screen.width >= 1024) {
        this.mobile = false;
      }

      this.loggedIn = this.auth.isLoggedIn;
      this.subscription = this.productService.products.subscribe(data => {
        this.lastInArray = data[(data.length - 1)].name;
        this.firstInArray = data[0].name;
        const databaseData = Object.keys(data).map(i => data[i]);
        this.products = databaseData;
    });
  
      this.productService.totalQueryProduct.subscribe(data => {this.totalProducts = data.size; });
  
      this._languageService.lang.subscribe(lang => {
        this.language = lang;

        this._main.main.subscribe(data => {
          this.productsPage = data.product;
        });

        this._main.tables.subscribe(data => {
          this.tableHeaders = data.products;
        });
      });

      this._common.lists.subscribe(data => {
        this.multiInputProducts = data.products;
      });

      this._common.columns.subscribe(data => {
        this.columnHeaders = data.products;
      });
  
      this.auth.userObserLoginObservable.subscribe(isLoggedIn => {
        this.loggedIn = isLoggedIn;
      });
    }

    openCreateModal(): void {
        this.dialogService.open(CreateProductModalComponent, {
            data: {
              language: this.language,
              editMode: false,
              fields: this.tableHeaders,
              tableFields: this.tableHeaders,
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
                  }
                });
              notif.afterClosed.subscribe( result => {
                  this.productService.addProduct(this.product);
                });
            }
          } else {
            this.notificationService.open(NotificationConfirmationComponent, {
              data: {
                  invalid: true
              }
            });
          }
            
        }, () => { });
    }

    openEditModal(newProduct: Product): void {
        this.dialogService.open(CreateProductModalComponent, {
            data: {
                language: this.language,
                editMode: true,
                fields: this.columnHeaders,
                tableFields: this.tableHeaders,
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
                }
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
                }
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
                  }
                });
              }
            }
        });
    }

    
  ngOnDestroy() {
    this.subscription.unsubscribe();
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
            this.paginator('plus', this.productService.nextSearch(this.limit, this.lastInArray, this.selected));
          } else if (event === this.currentPage - 1) {
            this.paginator('minus', this.productService.prevSearch(this.limit, this.firstInArray, this.selected));
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

  limitChange(event) {
    this.limit = event;
    this.refresh(true);
  }

  refresh(changeLimit) {
    if (changeLimit) {
      if (this.selected.length === 0) {
        this.currentPage = 1;
        this.newSubscription(false, this.productService.searchQuery(this.limit));
        } else {
          this.newSubscription(true, this.productService.searchQuery(this.limit, this.selected));
        }
    }
    else {
      if (this.selected.length === 0) {
          this.currentPage = 1;
          this.newSubscription(false, this.productService.searchQuery(this.limit));
          } else {
            debugger;
            this.newSubscription(true, this.productService.searchQuery(this.limit, this.selected));
          }
    }
  }

  private newSubscription(searching: boolean, callback: void) {
    this.searching = searching;
    this.subscription.unsubscribe();
    callback;
    this.productService.totalQueryProduct.subscribe(data => {this.totalProducts = data.size; });
    this.subscription = this.productService.products.subscribe(data => {
      this.dataChange(data);
    });
  }

  private dataChange(data) {
    this.lastInArray = data[(data.length - 1)].name;
    this.firstInArray = data[0].name;
    const databaseData = Object.keys(data).map(i => data[i]);
    this.products = databaseData;
  }
}
