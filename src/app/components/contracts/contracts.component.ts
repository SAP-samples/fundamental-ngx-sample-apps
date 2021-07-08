import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {Contract} from '../../models/contract.model';
import {AlertService, DialogService, CalendarModule, FdDate, NotificationService} from '@fundamental-ngx/core';
import {CreateContractModalComponent} from './create-contract-modal/create-contract-modal.component';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import { Product } from 'src/app/models/product.model';
import { CdkTable } from '@angular/cdk/table';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import {ContractsService} from 'src/app/services/contracts/contracts.service';
import {NotificationConfirmationComponent} from 'src/app/shared/notification-confirmation/notification-confirmation.component';
import {AuthService} from 'src/app/services/auth/auth.service';
import {CompactService} from 'src/app/services/compact/compact.service';
import {ContractPageService} from 'src/app/services/contract-page/contract-page.service';
import {BinaryOperator, FunctionCall} from '@angular/compiler';
import {LanguageService} from 'src/app/services/language/language.service';
import {MainService} from 'src/app/services/main/main.service';
import {CommonService} from 'src/app/services/common/common.service';

@Component({
    selector: 'app-contracts',
    templateUrl: './contracts.component.html',
    styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

  globalCompact: boolean;
  contracts: any;
  multiInputContracts: any;
  selected: Contract[] = [];
  subscription: Subscription;
  columnHeaders: string [] = [];
  tableHeaders: string [] = [];
  language: 'en' | 'fr' = 'en';
  contractPage: {title: string, description: string} = {title: '', description: ''};
  contract: Contract = null;
  totalContracts: number;
  isLoggedIn = false;
  firstInArray: string;
  lastInArray: string;
  searching = false;
  currentPage = 1;
  limit = 5;
  loading = false;
  itemsPerPageOptions: number[] = [1, 5, 10];
  mobile: boolean = true;

    @ViewChild('table', {static: false}) table: CdkTable<{}[]>;

    constructor(
      private authService: AuthService,
      private contractService: ContractsService,
      private compactService: CompactService,
      private dialogService: DialogService,
      private _main: MainService,
      private _common: CommonService,
      private contractPageData: ContractPageService,
      public alertService: AlertService,
      private _languageService: LanguageService,
      private notificationService: NotificationService
      ) {
      }

      ngOnInit() {
        if(screen.width>=1024) {
          this.mobile = false;
        }
        this.loading = true;
        this.isLoggedIn = this.authService.isLoggedIn;
        this.subscription = this.contractService.getContractsObservable().subscribe(data => {
          this.lastInArray = data[(data.length - 1)].company;
          this.firstInArray = data[0].company;
          const databaseData = Object.keys(data).map(i => data[i]);
          this.contracts = databaseData;
      });

        this.contractService.totalQueryContract.subscribe(data => {this.totalContracts = data.size; });

        this.compactService.compact.subscribe(result => {
        this.globalCompact = result;
      });

        this._languageService.lang.subscribe(language => {
          this.language = language;
      });

      this._main.main.subscribe(mainInfo => {
        this.contractPage = mainInfo.contract;
      });

      this._main.tables.subscribe(mainInfo => {
        this.tableHeaders = mainInfo.contracts;
      });

        this._common.lists.subscribe(data => {
        this.multiInputContracts = data.contracts;
      });

        this._common.columns.subscribe(data => {
        this.columnHeaders = data.contracts;
      });

        this.authService.userObserLoginObservable.subscribe(loggedIn => {this.isLoggedIn = loggedIn; });
        this.loading = false;
    }

    openCreateModal(): void {
        this.dialogService.open(CreateContractModalComponent, {
            responsivePadding: true,
            data: {
              language: this.language,
              editMode: false,
              fields: this.tableHeaders
            }

        }).afterClosed.subscribe(result => {
          if (this.isLoggedIn){
            if (result) {
              this.contract = result;
              const notificationService = this.notificationService.open(NotificationConfirmationComponent, {
                data: {
                    language: this.language,
                    company: result.company,
                    contact: result.contact,
                    status: result.status,
                }
            });

              notificationService.afterClosed.subscribe(
                (result) => {
                    if (result == 'OK'){
                      this.contractService.addContract(this.contract);
                    }
                },
                (error) => {
                }
            ); }
          } else {
            this.notificationService.open(NotificationConfirmationComponent, {
              data: {
                  invalid: true
              }
            });
          }
        }, () => {});
    }

    openEditModal(newContract: Contract): void {
        const copyObj = Object.assign({}, newContract);
        const tempDate = new Date(newContract.signed.seconds * 1000);
        copyObj.signed = new FdDate(tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate());
        this.dialogService.open(CreateContractModalComponent, {
            data: {
              language: this.language,
                editMode: true,
                fields: this.columnHeaders,
                contract: copyObj
            }
        }).afterClosed.subscribe(result => {
          if (this.isLoggedIn){
            if (result) {
                this.contract = result;
                const notificationService = this.notificationService.open(NotificationConfirmationComponent, {
                  data: {
                      language: this.language,
                      company: result.company,
                      contact: result.contact,
                      status: result.status,
                  }
              });

                notificationService.afterClosed.subscribe(
                  (result) => {
                      if (result == 'OK'){
                        this.contractService.updateContract(this.contract);
                      }
                  },
                  (error) => {
                  }
              ); }

              } else {
                this.notificationService.open(NotificationConfirmationComponent, {
                  data: {
                      invalid: true
                  }
              });
              }
        }, () => {});
    }

    openConfirmModal(company): void {
        this.dialogService.open(ConfirmModalComponent).afterClosed.subscribe(result => {
            if (result) {
              if (this.isLoggedIn){
                this.contractService.deleteContract(company);
              } else {
                this.notificationService.open(NotificationConfirmationComponent, {
                  data: {
                      invalid: true
                  }
              });
              }
            }
        }, () => {});
    }

    newPageClicked(event) {
      this.loading = true;
      if (event === this.currentPage + 1 || event === this.currentPage - 1 ) {
        if (this.currentPage === event) {

        } else {
          if (this.searching === false) {
            if (event === this.currentPage + 1) {
              this.paginator('plus', this.contractService.next(this.lastInArray, this.limit));
            } else if (event === this.currentPage - 1) {
              this.paginator('minus', this.contractService.prev(this.lastInArray, this.limit));
            }
            this.contractService.totalQueryContract.subscribe(data => {this.totalContracts = data.size; });
          } else {
            if (event === this.currentPage + 1) {
              this.paginator('plus', this.contractService.nextSearch(this.lastInArray, this.limit, this.selected));
            } else if (event === this.currentPage - 1) {
              this.paginator('minus', this.contractService.prevSearch(this.firstInArray, this.limit, this.selected));
            }
            this.contractService.totalQueryContract.subscribe(data => {this.totalContracts = data.size; });
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
        this.subscription = this.contractService.getContractsObservable().subscribe(data => {
          this.lastInArray = data[(data.length - 1)].company;
          this.firstInArray = data[0].company;
          const databaseData = Object.keys(data).map(i => data[i]);
          this.contracts = databaseData;
        });
      } else if (operator === 'minus') {
        this.currentPage = this.currentPage - 1;
        callback;
        this.subscription.unsubscribe();
        this.subscription = this.contractService.getContractsObservable().subscribe(data => {
          this.lastInArray = data[(data.length - 1)].company;
          this.firstInArray = data[0].company;
          const databaseData = Object.keys(data).map(i => data[i]);
          this.contracts = databaseData;
        });
      }
    }


  limitChange(event) {
    this.limit = event;
    this.refresh(true);
  }

  refresh(changeLimit) {
    if (changeLimit) {
      if (this.selected.length === 0) {
        this.currentPage = 1;
        this.newSubscription(false, this.contractService.searchQuery(this.limit));
        } else {
          this.newSubscription(true, this.contractService.searchQuery(this.limit, this.selected));
        }
    }
    else {
      if (this.selected.length === 0) {
          this.currentPage = 1;
          this.newSubscription(false, this.contractService.searchQuery(this.limit));
          } else {
            this.newSubscription(true, this.contractService.searchQuery(this.limit, this.selected));
          }
    }
  }

  private newSubscription(searching: boolean, callback: void) {
    this.searching = searching;
    this.subscription.unsubscribe();
    callback;
    this.contractService.totalQueryContract.subscribe(data => {this.totalContracts = data.size; });
    this.subscription = this.contractService.contractObservable.subscribe(data => {
      this.dataChange(data);
    });
  }

  private dataChange(data) {
    this.lastInArray = data[(data.length - 1)].company;
    this.firstInArray = data[0].company;
    const databaseData = Object.keys(data).map(i => data[i]);
    this.contracts = databaseData;
  }
}

