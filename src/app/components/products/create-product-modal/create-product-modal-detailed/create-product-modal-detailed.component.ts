import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { DialogRef, FdDate, DIALOG_REF } from '@fundamental-ngx/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MyValidation } from './../../../contracts/create-contract-modal/create-contract-modal-int';

@Component({
  selector: 'app-create-product-modal-detailed',
  templateUrl: './create-product-modal-detailed.component.html',
  styleUrls: ['./create-product-modal-detailed.component.scss']
})
export class CreateProductModalDetailedComponent implements OnInit, AfterViewInit {

   detailedProductForm = new FormGroup({
        product_date_signed: new FormControl('', [Validators.required]),
    });

    // tslint:disable-next-line: max-line-length
    productDateValid: MyValidation = { formControl: this.detailedProductForm.get('product_date_signed'), state: '', warningType: '', hidden: true };
    validityName;


changeValueState(validity: string) {

        switch (validity) {
            case 'productDateValid': this.validityName = this.productDateValid; break;
        }

        if (this.validityName.formControl.status === 'INVALID') {
            this.validityName.state = 'error';
            this.validityName.warningType = 'error';
            this.validityName.hidden = false;
        } else {
            this.validityName.state = 'success';
            this.validityName.warningType = '';
            this.validityName.hidden = true;
        }
    }

    ngOnInit() {
    }
    ngAfterViewInit() {
    }
    myDisableFunction = (d: FdDate) => {
        const day = d.getDay();
        return day === 6 || day === 0;
    }
    myBlockFunction =  (d: FdDate) => {
        const firstDay = FdDate.getToday();
        const lastDay = new FdDate(firstDay.year, firstDay.month, firstDay.day);
        return d.getTimeStamp() > firstDay.getTimeStamp() && d.getTimeStamp() < lastDay.getTimeStamp();
    }

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {
    }

    closeModal() {
      event.preventDefault();
      this.dialogRef.close();
    }



}
