import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { state } from '@angular/animations';
import {
  DatetimeAdapter,
  DATE_TIME_FORMATS,
  FdDate,
  FdDatetimeAdapter,
  FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';
import { DateRange } from '@fundamental-ngx/core/calendar';

interface ComboboxItem {
  displayedValue: string;
  value: string;
}


@Component({
  selector: 'reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
  providers: [
    {
      provide: DatetimeAdapter,
      useClass: FdDatetimeAdapter
    },
    {
      provide: DATE_TIME_FORMATS,
      useValue: FD_DATETIME_FORMATS
    }
  ]


})
export class ReactiveFormComponent implements OnInit {

  title = 'app_ngx';
  optionThreeVariable = "";
  //Drop down elements with their values
  selectedIndex!: number;
  reg!: FormGroup;
  
  //myform!: FormGroup;
  //firstName!: FormControl;
  //lastName!: FormControl;
  //email!: FormControl;
  //password!: FormControl;
  //'firstname' : new FormControl(null, Validators.required)

  /*onReset(){

    if (this.myform.valid){
      console.log("Clear the format")
    this.myform?.reset();
    }
  }*/

  vtest: boolean | undefined;

  selectedRange: DateRange<FdDate>;

  constructor(private datetimeAdapter: DatetimeAdapter<FdDate>, private fb: FormBuilder) {
    const today = this.datetimeAdapter.today();
    this.selectedRange = new DateRange(today, this.datetimeAdapter.addCalendarDays(today, 1));
  }
 

  ngOnInit() {
    this.vtest = undefined;
    this.reg = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose( [ Validators.required, Validators.email ])),
      password: new FormControl('', Validators.required),
      repeat_password: new FormControl('', Validators.required),
      firstNameGroup: new FormControl('', Validators.required),
      date : new FormControl(FdDate.getNow()),
      radioInput: new FormControl(''),
      country: new FormControl(),
      textAreaControl: new FormControl(''),
      icecream: new FormControl(),
    });
    console.log(this.reg);
    
    
  }

 
//loading button
  loading = false;
  Show(){
  

      this.loading = true;   
  
  }
  
  radioInput = {
    name: 'radio-input-form',
    formControlName: 'radioInput',
    values: ['Female', 'Male', 'Other'],
}; 
  get f() {
    return this.reg.controls;
  }

  submit(register: any) {
    console.log("Form Submitted!", register);
  }


  dropdownValues = ['Albania', 'Australia', 'Canada', 'USA'];
  dropdownValues2 = ['Mint Chocolate Chip', 'Vanilla', 'Mango', 'Chocolate', 'Pistachio', 'Cookie Dough', 'Strawberry', 'Green Tea'];



  customFilter(content: any[], searchTerm: string): any[] {
    if (!searchTerm) {
      return content;
    }
    return content.filter((item) => item.startsWith(searchTerm));

  }

  getFieldState(formControl: AbstractControl) {
    return formControl.invalid && formControl.touched ? 'error' : undefined;
  }

  


 
}
