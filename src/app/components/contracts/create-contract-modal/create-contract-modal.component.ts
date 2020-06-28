import {Component, OnInit, Inject} from '@angular/core';
import {FdDate} from '@fundamental-ngx/core';
import {FormControl, FormGroup, Validators, FormGroupDirective, NgForm} from '@angular/forms';

import { invalid } from '@angular/compiler/src/render3/view/util';
import { MyValidation } from './create-contract-modal-int';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(
    control: FormControl | null, 
    form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

@Component({
    selector: 'app-create-contract-modal',
    templateUrl: './create-contract-modal.component.html',
    styleUrls: ['./create-contract-modal.component.scss']
})
export class CreateContractModalComponent implements OnInit {
    matcher = new MyErrorStateMatcher();

    editMode = false;

    contractForm = new FormGroup({
        company: new FormControl('', [Validators.required]),
        contact: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        value: new FormControl('', [Validators.required, Validators.min(1)]),
        status: new FormControl('', [Validators.required]),
    });




    constructor(public dialogRef: MatDialogRef<CreateContractModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    ngOnInit() {

        if (this.data) {
            const contract = this.data.contract;
        }
    }

    submitForm(): void {
        const tmpObj = this.contractForm.getRawValue();
        this.dialogRef.close(tmpObj);
    }

}
