import {Component, OnInit} from '@angular/core';
import {ModalRef} from '@fundamental-ngx/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
        user_number: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
        
    });

    constructor(public modalRef: ModalRef) {
    }

    ngOnInit() {
        this.editMode = this.modalRef.data.editMode;
        const product = this.modalRef.data.product;

        if (this.editMode && product) {
            Object.keys(product).forEach(key => {
                if (this.productForm.controls[key]) {
                    this.productForm.controls[key].setValue(product[key]);
                }
            });
        }
    }

    submitForm(): void {
        this.modalRef.close(this.productForm.getRawValue());
    }

}
