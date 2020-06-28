import {Component, OnInit, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MyValidation } from './../../contracts/create-contract-modal/create-contract-modal-int';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateContractModalComponent } from '../../contracts/create-contract-modal/create-contract-modal.component';

@Component({
    selector: 'app-create-product-modal',
    templateUrl: './create-product-modal.component.html',
    styleUrls: ['./create-product-modal.component.scss']
})
export class CreateProductModalComponent implements OnInit {

    editMode = false;

    productForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        contact: new FormControl('', [Validators.required]),
        lob: new FormControl('', [Validators.required]),
        user_number: new FormControl('', [Validators.required, Validators.min(0), Validators.max(2000)]),
        status: new FormControl('', [Validators.required]),
    });

    validityName;

    nameValid: MyValidation = { formControl: this.productForm.get('name'), state: '', warningType: '', hidden: true };
    contactValid: MyValidation = {formControl: this.productForm.get('contact'), state: '', warningType: '', hidden: true };
    lobValid: MyValidation = {formControl: this.productForm.get('lob'), state: '', warningType: '', hidden: true };
    user_numberValid: MyValidation = {formControl: this.productForm.get('user_number'), state: '', warningType: '', hidden: true };
    statusValid: MyValidation = {formControl: this.productForm.get('status'), state: '', warningType: '', hidden: true };
    productDateValid: MyValidation = {formControl: this.productForm.get('product_date_signed'), state: '', warningType: '', hidden: true };


    changeValueState(validity: string) {

        switch (validity) {
            case 'nameValid': this.validityName = this.nameValid; break;
            case 'contactValid': this.validityName = this.contactValid; break;
            case 'lobValid': this.validityName = this.lobValid; break;
            case 'user_numberValid': this.validityName = this.user_numberValid; break;
            case 'statusValid': this.validityName = this.statusValid; break;
            case 'productDateValid': this.validityName = this.productDateValid; break;
        }

        if (this.validityName.formControl.status === 'INVALID') {
            this.validityName.state = 'invalid';
            this.validityName.warningType = 'error';
            this.validityName.hidden = false;
        } else {
            this.validityName.state = 'normal';
            this.validityName.warningType = '';
            this.validityName.hidden = true;
        }
    }

    constructor(public dialogRef: MatDialogRef<CreateContractModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }

    submitForm(): void {
        const tmpObj = this.productForm.getRawValue();
        this.dialogRef.close(tmpObj);    }

}
