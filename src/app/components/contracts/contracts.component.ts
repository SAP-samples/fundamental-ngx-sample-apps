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

@Component({
    selector: 'app-contracts',
    templateUrl: './contracts.component.html',
    styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

    globalCompact: boolean;
    contracts: any;
    selected: Contract[] = [];
    filteredDataSource: Contract[];
    subscription: Subscription;
    columnHeaders: string [] = [];
    contractPage: {title: string, description: string} = {title: '', description: ''};
    contract: Contract = null;
    totalContracts: number;
    isLoggedIn = false;

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



    constructor(
      private authService: AuthService,
      private contractService: ContractsService,
      private compactService: CompactService,
      private dialogService: DialogService,
      private contractPageData: ContractPageService,
      public alertService: AlertService,
      private notificationService: NotificationService
      ) {
}

    ngOnInit() {
      this.isLoggedIn = this.authService.isLoggedIn;
      this.contractService.getContractsObservable().subscribe(data => {
        const databaseData = Object.keys(data).map(i => data[i]);
        this.contracts = databaseData;
        this.dataSource = databaseData;
        this.filteredDataSource = databaseData;
      }, error => {

      });

      this.compactService.compact.subscribe(result => {
        this.globalCompact = result;
      });

      this.contractPageData.contractHeader.subscribe(data => {
        this.contractPage = {title: data.title, description: data.description};
        this.totalContracts = data.numOfContracts;
      });
      this.contractPageData.contractColumns.subscribe(data => {
        this.columnHeaders = data.columns;
      });

      this.authService.userObserLoginObservable.subscribe(loggedIn => {this.isLoggedIn = loggedIn; });
    }


    openCreateModal(): void {
        this.dialogService.open(CreateContractModalComponent, {
            responsivePadding: true,
            data: {
              editMode: false,
              fields: this.columnHeaders
            }

        }).afterClosed.subscribe(result => {
          if (this.isLoggedIn){
            if (result) {
              this.contract = result;
              const notificationService = this.notificationService.open(NotificationConfirmationComponent, {
                data: {
                    company: result.company,
                    contact: result.contact,
                    status: result.status,
                },
                size: 'm',
                type: 'success'
            });

              notificationService.afterClosed.subscribe(
                (result) => {
                    if (result == 'OK'){
                      this.contractService.addContract(this.contract, this.totalContracts);
                    }
                },
                (error) => {
                }
            ); }
          } else {
            this.notificationService.open(NotificationConfirmationComponent, {
              data: {
                  invalid: true
              },
              size: 'm',
              type: 'error'
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
                      company: result.company,
                      contact: result.contact,
                      status: result.status,
                  },
                  size: 'm',
                  type: 'warning'
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
                  },
                  size: 'm',
                  type: 'error'
              });
              }
        }, () => {});
    }

    openConfirmModal(company): void {
        this.dialogService.open(ConfirmModalComponent).afterClosed.subscribe(result => {
            if (result) {
              if (this.isLoggedIn){
                this.contractService.deleteContract(company, this.totalContracts);
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
        }, () => {});
    }

    newPageClicked(event) {
    }
}
