
import { Component, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DynamicFormGroup, DynamicFormValue, FormGeneratorService } from '@fundamental-ngx/platform/form';
import {
  WizardDialogGeneratorService,
  WizardGeneratorFormsValue,
  WizardGeneratorItem,
  WizardTitle
} from '@fundamental-ngx/platform/wizard-generator';
import { ChildrenOutletContexts } from '@angular/router';
import { DatePickerComponent, DatePickerModule, DatetimeAdapter, DATE_TIME_FORMATS, FdDatetimeAdapter, FD_DATETIME_FORMATS } from '@fundamental-ngx/core';
import { stepItems } from './steps';

@Component({
  selector: 'app-wizard-form',
  templateUrl: './wizard-form.component.html',
  styleUrls: ['./wizard-form.component.scss'],
  providers: [FormGeneratorService,  {
    provide: DatetimeAdapter,
    useClass: FdDatetimeAdapter
},
{
    provide: DATE_TIME_FORMATS,
    useValue: FD_DATETIME_FORMATS
}
]
})
export class WizardFormComponent implements OnDestroy {

  wizardValue: WizardGeneratorFormsValue | undefined;
  wizardTitle: WizardTitle = {
    size: 2,
    text: 'Personal Information'
  };
  stepItems: WizardGeneratorItem[] = stepItems;

  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private _wizardDialogService: WizardDialogGeneratorService,
    private _formGeneratorService: FormGeneratorService
  ) { }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  openDialog(): void {
    this._wizardDialogService
      .open({
        width: '100%',
        height: '100%',
        verticalPadding: false,
        data: {
          items: this.stepItems,
          appendToWizard: false,
          displaySummaryStep: true,
          responsivePaddings: true,
          title: this.wizardTitle
        }
      })
      .afterClosed.pipe(takeUntil(this._onDestroy$))
      .subscribe({next: ((wizardValue: WizardGeneratorFormsValue | undefined) => {
        this.wizardValue = wizardValue;
      }), error: () => {}});
  }



  wizardFinished(wizardValue: WizardGeneratorFormsValue): void {
    this.wizardValue = wizardValue;
  }
}