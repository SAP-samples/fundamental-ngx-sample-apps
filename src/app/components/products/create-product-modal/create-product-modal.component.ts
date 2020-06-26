import {Component, OnInit, Inject} from '@angular/core';
import {DialogRef, DialogModule, DialogService, DIALOG_REF} from '@fundamental-ngx/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MyValidation } from './../../contracts/create-contract-modal/create-contract-modal-int';
import {CreateProductModalDetailedComponent} from './create-product-modal-detailed/create-product-modal-detailed.component';

@Component({
    selector: 'app-create-product-modal',
    templateUrl: './create-product-modal.component.html',
    styleUrls: ['./create-product-modal.component.scss']
})
export class CreateProductModalComponent implements OnInit {

    editMode = false;
    globalCompact:boolean = false;
    fields: string[]= [];

    productForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        contact: new FormControl('', [Validators.required]),
        lob: new FormControl('', [Validators.required]),
        user_number: new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000000000000)]),
        status: new FormControl('', [Validators.required]),
    });

    openModal() {
        this.dialogService.open(CreateProductModalDetailedComponent, {
          data: {
            compact: this.globalCompact
          },
          responsivePadding:true
        }).afterClosed.subscribe(result => {
          if (result) {
            
          }
      });
    }

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef, private dialogService: DialogService) {
    }

    ngOnInit() {
        this.globalCompact = this.dialogRef.data.compact;
        this.editMode = this.dialogRef.data.editMode;
        this.fields = this.dialogRef.data.fields;
        const product = this.dialogRef.data.product;

        if (this.editMode && product) {
            Object.keys(product).forEach(key => {
                if (this.productForm.controls[key]) {
                    this.productForm.controls[key].setValue(product[key]);
                }
            });
        }
    }

    submitForm(): void {
        this.dialogRef.close(this.productForm.getRawValue());
    }

}
