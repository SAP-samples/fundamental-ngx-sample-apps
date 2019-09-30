import {Component, OnInit} from '@angular/core';
import {ModalRef, ModalModule, ModalService, FdDate} from '@fundamental-ngx/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { invalid } from '@angular/compiler/src/render3/view/util';
import { MyValidation } from './create-contract-modal-int';
@Component({
    selector: 'app-create-contract-modal',
    templateUrl: './create-contract-modal.component.html',
    styleUrls: ['./create-contract-modal.component.scss']
})
export class CreateContractModalComponent implements OnInit {

    editMode = false;

    contractForm = new FormGroup({
        company: new FormControl('', [Validators.required]),
        contact: new FormControl('', [Validators.required]),
        date_signed: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        value: new FormControl('', [Validators.required, Validators.min(1)]),
        status: new FormControl('', [Validators.required]),
    });

    companyValid: MyValidation = { formControl: this.contractForm.get('company'), state: '', warningType: '', hidden: true };
    contactValid: MyValidation = {formControl: this.contractForm.get('contact'), state: '', warningType: '', hidden: true };
    dateValid: MyValidation = {formControl: this.contractForm.get('date_signed'), state: '', warningType: '', hidden: true };
    typeValid: MyValidation = {formControl: this.contractForm.get('type'), state: '', warningType: '', hidden: true };
    valueValid: MyValidation = {formControl: this.contractForm.get('value'), state: '', warningType: '', hidden: true };
    statusValid: MyValidation = {formControl: this.contractForm.get('status'), state: '', warningType: '', hidden: true };

    date: FdDate = FdDate.getToday();
    validityName;


    changeValueState(validity: string) {

        switch (validity) {
            case 'companyValid': this.validityName = this.companyValid; break;
            case 'contactValid': this.validityName = this.contactValid; break;
            case 'dateValid': this.validityName = this.dateValid; break;
            case 'typeValid': this.validityName = this.typeValid; break;
            case 'valueValid': this.validityName = this.valueValid; break;
            case 'statusValid': this.validityName = this.statusValid; break;
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

    myDisableFunction = (d: FdDate) => {
        const day = d.getDay();
        return day === 6 || day === 0;
    }
    myBlockFunction =  (d: FdDate) => {
        const firstDay = FdDate.getToday();
        const lastDay = new FdDate(firstDay.year, firstDay.month, firstDay.day);
        return d.getTimeStamp() > firstDay.getTimeStamp() && d.getTimeStamp() < lastDay.getTimeStamp();
    }

    constructor(public modalRef: ModalRef, private modalService: ModalService) {

    }

    ngOnInit() {
        this.editMode = this.modalRef.data.editMode;
        const contract = this.modalRef.data.contract;

        if (this.editMode && contract) {
            Object.keys(contract).forEach(key => {
                if (key === 'date_signed') {
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
        tmpObj.date_signed = this.date;
        this.modalRef.close(tmpObj);
    }

}
