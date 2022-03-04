import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
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



@Component({
  selector: 'reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <fd-date-picker type="range" [(ngModel)]="selectedRange"> </fd-date-picker>`,
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

  selectedRange: DateRange<FdDate>;

  constructor(private datetimeAdapter: DatetimeAdapter<FdDate>, private fb: FormBuilder) {
    const today = this.datetimeAdapter.today();
    this.selectedRange = new DateRange(today, this.datetimeAdapter.addCalendarDays(today, 1));
  }

  ngOnInit() {
    this.reg = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      firstNameGroup: new FormControl('', Validators.required),
    });
  }

  submit(register: any) {
    console.log("Form Submitted!", register);
  }


  dropdownValues = ['Albania', 'Australia', 'Canada', 'USA'];
  dropdownVal2 = ['Mint Chocolate Chip', 'Vanilla', 'Mango', 'Chocolate', 'Pistachio', 'Cookie Dough', 'Strawberry', 'Green Tea'];

  customFilter(content: any[], searchTerm: string): any[] {
    if (!searchTerm) {
      return content;
    }
    return content.filter((item) => item.startsWith(searchTerm));

  }
  showLoad = {
    loading: false
  }
}