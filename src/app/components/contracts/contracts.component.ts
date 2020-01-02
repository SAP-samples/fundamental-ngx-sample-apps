import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {Contract} from '../../models/contract.model';
import {AlertService, ModalService, CalendarModule} from '@fundamental-ngx/core';
import {CreateContractModalComponent} from './create-contract-modal/create-contract-modal.component';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import { Product } from 'src/app/models/product.model';
import { CdkTable } from '@angular/cdk/table';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-contracts',
    templateUrl: './contracts.component.html',
    styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

    contracts: any;
    selected: Contract[] = [];
    filteredDataSource: Contract[];
    subscription: Subscription;
    columnHeaders: string [] = ['company', 'contact', 'signed', 'type', 'value', 'status'];


    @ViewChild('table', {static: false}) table: CdkTable<{}[]>;

    dataSource: Contract[];

    dropRow(event) {
        const prevIndex = this.filteredDataSource.findIndex((d) => d === event.item.data);
        moveItemInArray(this.filteredDataSource, prevIndex, event.currentIndex);
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

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.filteredDataSource, event.previousIndex, event.currentIndex);
        this.table.renderRows();
    }

    constructor(db: AngularFirestore, public dialog: MatDialog, private _snackBar: MatSnackBar) {
        this.subscription = db.collection('contracts').valueChanges().subscribe(data => {
            this.contracts = data;
            this.dataSource = data;
            this.filteredDataSource = data;
            console.log(this.filteredDataSource);
        });
}

    ngOnInit() {
    }



    openCreateModal(): void {
        const dialogRef = this.dialog.open(CreateContractModalComponent,{
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

      openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 2000,
          verticalPosition: 'top'
        });
      }

      openConfirmModal(): void {
        const dialogRef = this.dialog.open(ConfirmModalComponent);
    
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._snackBar.open('Create not allowed in this version.', '', {
                    duration: 2000,
                  });
            }
        });
      }


}
