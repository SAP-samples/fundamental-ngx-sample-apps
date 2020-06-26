import {Component, OnInit, Inject} from '@angular/core';
import {DialogRef, DialogModule, DialogService, FdDate, DIALOG_REF} from '@fundamental-ngx/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { invalid } from '@angular/compiler/src/render3/view/util';
import { MyValidation } from './create-contract-modal-int';
import {CompactService} from 'src/app/services/compact/compact.service';
import {ContractPageService} from 'src/app/services/contract-page/contract-page.service';
@Component({
    selector: 'app-create-contract-modal',
    templateUrl: './create-contract-modal.component.html',
    styleUrls: ['./create-contract-modal.component.scss']
})
export class CreateContractModalComponent implements OnInit {

    editMode = false;
    globalCompact = false;
    fields: string [] = [];
    
    contractForm = new FormGroup({
        company: new FormControl('', [Validators.required]),
        contact: new FormControl('', [Validators.required]),
        signed: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        value: new FormControl('', [Validators.required, Validators.min(1)]),
        status: new FormControl('', [Validators.required]),
    });


    date: FdDate = FdDate.getToday();
    validityName;

    constructor(
    @Inject(DIALOG_REF) public dialogRef: DialogRef, 
    compactService: CompactService
    ) {
      compactService.compact.subscribe(result => {
        this.globalCompact = result;
      })
    }

    ngOnInit() {
        this.editMode = this.dialogRef.data.editMode;
        const contract = this.dialogRef.data.contract;
        this.fields = this.dialogRef.data.fields;

        if (this.editMode && contract) {
            Object.keys(contract).forEach(key => {
                if (key === 'signed') {
                    this.date = contract[key];
                }
                if (this.contractForm.controls[key]) {
                    this.contractForm.controls[key].setValue(contract[key]);
                }
            });
        }
    }

    submitForm(): void {
        const tmpObj = this.contractForm.getRawValue();
        this.dialogRef.close(tmpObj);
    }

}
