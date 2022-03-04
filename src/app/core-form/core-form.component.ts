import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    NgForm
  } from '@angular/forms';
  import { state } from '@angular/animations';
  import {
    DatetimeAdapter,
    DateTimeFormats,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
  } from '@fundamental-ngx/core/datetime';
  import { DateRange } from '@fundamental-ngx/core/calendar';



@Component({
  selector: 'core-form',
  templateUrl: './core-form.component.html',
  styleUrls: ['./core-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class CoreFormComponent implements OnInit {
  
    title = 'app_ngx';
  optionThreeVariable = "";
  //Drop down elements with their values
  selectedIndex!: number;
  reg: FormGroup | undefined;
  date = FdDate.getNow();

ngOnInit(){
this.reg = new FormGroup ({

})
  

}

  

submit(register: any) {
  
    console.log("Form Submitted!", register);
    console.log("First Name is : " + register.value.firstName);
    console.log("Last Name is : " + register.value.lastName);
    console.log("Email is : " + register.value.email);
    console.log("Password is : " + register.value.password);
    console.log("Repeat Password is : " + register.value.repeat_password);
    console.log("Date of bith is : " + register.value.date);
    console.log("Country is : " + register.value.country);
    console.log("Gender is : " + register.value.gender);
    console.log("Short Bio is : " + register.value.bio);
    console.log("Ice cream flavor is : " + register.value.icecream);

  


  
}

 
  dropdownValues = ['Albania', 'Australia', 'Canada', 'USA'];
   dropdownVal2 = ['Mint Chocolate Chip', 'Vanilla', 'Mango', 'Chocolate', 'Pistachio', 'Cookie Dough','Strawberry', 'Green Tea'];

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