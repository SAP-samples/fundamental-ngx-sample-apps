
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

  wizardValue!: WizardGeneratorFormsValue;
  wizardTitle: WizardTitle = {
    size: 2,
    text: 'Personal Information'
  };
  stepItems: WizardGeneratorItem[] = [
    {
      name: 'Product type',
      id: 'productTypeStep',
      formGroups: [
        {
          title: '1. Pastry',
          id: 'productType',
          formItems: [
            {
              name: 'product',
              message: 'Choose your pastry',
              type: 'select',
              choices: ['Ice-cream', 'Cookies', 'Cake'],
              validators: [Validators.required]
            },

            {
              name: 'cookies_flavour',
              message: 'What kind of cookie would you like?',
              type: 'select',
              choices: ['Chocolate chip', 'Lemon', 'Gingersnaps', 'Peanut Butter', 'Salted Caramel'],
              validators: [Validators.required],
              when: (formValue: DynamicFormValue): boolean => formValue['product'] === 'Cookies'
            },
            {
              name: 'cake_flavours',
              message: 'Which birthday cake would you like?',
              type: 'select',
              choices: ['Double Chocolate', 'Oreo', 'Cheesecake', 'Lemon yoghurt'],
              validators: [Validators.required],
              when: (formValue: DynamicFormValue): boolean => formValue['product'] === 'Cake'
            }
          ]
        },
        {
          title: '1.1. Build your Ice-cream',
          id: 'ice_cream_flavour',
          dependencyFields: {
            productTypeStep: {
              productType: ['product']
            }
          },
          when: (completedSteps: string[], answers: WizardGeneratorFormsValue) => {
            const value = answers['productTypeStep']?.['productType']?.['product'];
            return value !== undefined && value !== 'Cookies' && value !== 'Cake';
          },
          formItems: [
            {
              name: 'build_icecream',
              message: 'Would you like cone or cup for base?',
              type: 'radio',
              choices: ['Cone', 'Cup'],
              validators: [Validators.required]

            },
            {
              name: 'icecream_flavours',
              message: 'Select the ice-cream flavour',
              type: 'select',
              choices: ['Pistachio', 'Chocolate', 'Mint', 'Strawberry', 'Banana', "Vanilla"],
              validators: [Validators.required],
              when: (formValue: DynamicFormValue): boolean => formValue['build_icecream'] !== null
            }
          ]
        }
      ]
    },

    {
      name: 'Pick the shop',
      id: 'shop',
      formGroups: [
        {
          title: 'Pastry',
          id: 'pastry',
          formItems: [
            {
              name: 'pastry',
              message: 'Pick a pastry shop',
              type: 'radio',
              choices: ['Bake n Take', 'Nona Pastry', 'Cakey Bakey', 'Dangerously Delicious Pies'],
              validators: [Validators.required],
            },

            {
              name: 'pick_up',
              message: 'Would you like to pick the item(s) up?',
              type: 'switch',
              default: false,
              when: (formValue: DynamicFormValue): boolean => formValue['pastry'] === 'Bake n Take'
            },

          ]
        }
      ]
    },
    {
      name: 'Customer information',
      id: 'customerInformationStep',
      formGroups: [
        {
          title: '2. Customer Information',
          id: 'customerInformation',
          formItems: [
            {
              name: 'firstname',
              message: 'First Name',
              type: 'input',
              validators: [Validators.required]
            },
            {
              name: 'lastname',
              message: 'Last Name',
              type: 'input',
              validators: [Validators.required]
            },
            {
              name: 'email',
              message: 'Email',
              type: 'email',
              validators: [Validators.required]
            },
            {
              name: 'password',
              message: 'Password',
              type: 'password',
              controlType: 'password',
              validators: [Validators.required]
            },
            {
              name: 'repeat_password',
              message: 'Repeat Password',
              type: 'password',
              controlType: 'password',
              validators: [Validators.required]
            },
            {
              name: 'date',
              message: 'Date of Birth',
              type: 'datepicker',
              validators: [Validators.required]
            },
            {
              name: 'country',
              message: 'Country',
              type: 'select',
              choices: ['Albania', 'Bulgaria', 'Canada', 'Ukraine', 'USA'],
            },
            {
              name: 'gender',
              message: 'Gender',
              type: 'radio',
              choices: ['Female', 'Male', 'Other'],
            },
            {
              name: 'bio',
              message: 'Short Bio',
              type: 'editor',
            },

          ]
        }
      ]
    },
    {
      name: 'Payment method',
      id: 'paymentMethodStep',
      formGroups: [
        {
          title: '3. Payment method',
          id: 'paymentMethodForm',
          formItems: [
            {
              name: 'paymentMethod',
              message: 'Select appropriate payment method',
              type: 'select',
              choices: ['Credit Card', 'Bank Transfer'],
              validators: [Validators.required]
            }
          ]
        }
      ]
    },
    {
        name: 'Credit Card Details',
        id: 'creditCardStep',
        when: (_completedSteps, answers) =>
            answers['paymentMethodStep']?.['paymentMethodForm']?.['paymentMethod'] === 'Credit Card',
        dependencyFields: {
            paymentMethodStep: {
                paymentMethodForm: ['paymentMethod']
            }
        },
        formGroups: [
            {
                title: '4. Credit Card Details',
                id: 'cardPayment',
                formItems: [
                    {
                        name: 'creditCardNumber',
                        message: 'Enter your credit card details',
                        type: 'input',
                        validators: [Validators.required]
                    }
                ]
            }
        ]
    },
    {
        name: 'Bank Details',
        id: 'bankDetailsStep',
        when: (_completedSteps, answers) =>
            answers['paymentMethodStep']?.['paymentMethodForm']?.['paymentMethod']=== 'Bank Transfer',
        dependencyFields: {
            paymentMethodStep: {
                paymentMethodForm: ['paymentMethod']
            }
        },
        formGroups: [
            {
                title: '4. Bank Details',
                id: 'bankDetailsForm',
                formItems: [
                    {
                        name: 'bankDetails',
                        message: 'Enter your bank details',
                        type: 'input',
                        validators: [Validators.required]
                    }
                ]
            }
        ]
    },
    {
        name: 'Discount',
        id: 'discountStep',
        when: (_completedSteps, answers) =>
            answers['paymentMethodStep']?.['paymentMethodForm']?.['paymentMethod'] === 'Bank Transfer' ||
            answers['paymentMethodStep']?.['paymentMethodForm']?.['paymentMethod'] === 'Credit Card',
        formGroups: [
            {
                title: '5. Discount details',
                id: 'discountForm',
                formItems: [
                    {
                        name: 'discount',
                        message: 'Enter your discount coupon code',
                        type: 'input'
                    }
                      ]
                    }
                ]
            },
          


    {
      name: 'Summary',
      id: 'summary',
      summary: true
    }
  ];

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
      .subscribe((wizardValue: WizardGeneratorFormsValue) => {
        this.wizardValue = wizardValue;
      });
  }



  wizardFinished(wizardValue: WizardGeneratorFormsValue): void {
    this.wizardValue = wizardValue;
  }
}