import {FormControl, AbstractControl} from '@angular/forms';


export interface MyValidation {
formControl: AbstractControl;
state: string;
warningType: string;
hidden: boolean;
}
