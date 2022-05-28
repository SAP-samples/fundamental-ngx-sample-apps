import { DynamicFormItem } from '@fundamental-ngx/platform/form';
import { Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';


export const dummyAwaitablePromise = (timeout = 200): Promise<boolean> =>
    new Promise<boolean>((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeout);
    });

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    private formData : DynamicFormItem[] = [
     
        {
          type: 'multi-input',
          name: 'firstname',
          message: 'First Name',
          placeholder: 'Enter your First Name',
          validate: async (value) => {
              await dummyAwaitablePromise();
  
              return value === ' ' ? null : 'Please enter a valid name';
          },
          transformer: async (value: any) => {
              await dummyAwaitablePromise();
              return `${value}777`;
          },
          validators: [Validators.required],
          guiOptions: {
              hint: "The first name should be a combination of letters only.",
              additionalData: {
                  glyph: "account",
                  glyphAriaLabel:"account"
              }
          }
      },
  
      {
        type: 'input',
        name: 'lastname',
        message: 'Last Name',
        placeholder: 'Enter your last name',
        
        validate: async (value) => {
            await dummyAwaitablePromise();
  
            return value === ' ' ? null : 'Please enter a valid name';
        },
        transformer: async (value: any) => {
            await dummyAwaitablePromise();
            return `${value}777`;
        },
        validators: [Validators.required],
        guiOptions: {
          hint: "The first name should be a combination of letters only."
      }
    },
    {
      type: 'email',
      name: 'email',
      message: 'Email',
      placeholder: 'Enter your email',
      
      validate: async (value) => {
          await dummyAwaitablePromise();
  
          return value === ' ' ? null : 'Please enter a valid email';
      },
      transformer: async (value: any) => {
          await dummyAwaitablePromise();
          return `${value}777`;
      },
      validators: [Validators.required]
  },
      {
        type: 'password',
        controlType: 'password',
        name: 'password',
        message: 'Password',
        placeholder: 'Enter your password',
        validators: [Validators.required],
        validate: (value: string) => {
            const passwordPattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\\w\\s]).{8,}$');
            return passwordPattern.test(value)
                ? null
                : 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character';
        },
       
        guiOptions: {
            column: 1,
            additionalData: {
              glyph: "account",
              glyphAriaLabel:"account"
          }
        }
    },
    {
      type: 'password',
      controlType: 'password',
      name: 'repeat_password',
      message: 'Repeat Password',
      placeholder: 'Repeat your password',
      validators: [Validators.required],
      validate: (value: string) => {
          const passwordPattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\\w\\s]).{8,}$');
          return passwordPattern.test(value)
              ? null
              : 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character';
      },
      guiOptions: {
          column: 1
      }
  },
  {
    type: 'datepicker',
    name: 'birthday',
    message: 'Date of Birth',
    guiOptions: {
        column: 2
    },
    validators: [Validators.required],
    validate: (value: FdDate) =>
        value !== null && value.year < 2020 ? null : 'You need to be born before 2020',
    transformer: (value: FdDate) => value?.toDateString()
  },
  
  {
    type: 'list',
    name: 'country',
    message: 'Country',
    validators: [Validators.required],
    choices: ['Australia','Albania', 'Bulgaria','Canada', 'USA'],
    guiOptions: {
        column: 2
    }
  },
  {
    type: 'radio',
    name: 'gender',
    message: 'Gender',
    choices: ['Female', 'Male', 'Other'],
    
    
    guiOptions: {
        column: 2,
        inline: true,
    }, 
    validate: (result: string) => (result === ' ' ? null : 'You should pick one')
  },
  {
    type: 'editor',
    name: 'bio',
    message: 'Short Bio',
    guiOptions: {
        column: 2
    }
  },
  {
    type: 'list',
    name: 'icecream',
    message: 'Ice Cream Flavours',
    choices: ['Mint Chocolate Chip','Vanilla', 'Mango','Chocolate', 'Pistachio','Cookie Dough','Strawberry', 'Green Tea'],
    guiOptions: {
        column: 2
    }
  },
  
  {
      type: 'checkbox',
      name: 'rememberme',
      message:'',
      guiOptions: {
          inline: true,
          column: 2
      },
      choices: () => ['Remember me']
  
  }
    ];

    constructor() {}

    getRegisrationData() {
        return this.formData;
    }
}