import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  DatetimeAdapter,
  DATE_TIME_FORMATS,
  FdDate,
  FdDatetimeAdapter,
  FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';
import { DynamicFormItem, DynamicFormValue, FormGeneratorComponent } from '@fundamental-ngx/platform/form';
import { RegistrationService } from '../services/registration.service';

export const dummyAwaitablePromise = (timeout = 200): Promise<boolean> =>
    new Promise<boolean>((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeout);
    });


@Component({
  selector: 'app-platform-form',
  templateUrl: './platform-form.component.html',
  providers: [
    // Note that this is usually provided in the root of your application.
    // Due to the limit of this example we must provide it on this level.
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
export class PlatformFormComponent {
  @ViewChild(FormGeneratorComponent) formGenerator!: FormGeneratorComponent;
  loading = false;

  formCreated = false;
  formValue!: DynamicFormValue;

  constructor( private registrationService: RegistrationService ){

    this.questions = this.registrationService.getRegisrationData()
  }

  questions: DynamicFormItem[];

  }