import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SelectModule } from '@fundamental-ngx/core/select';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { TextComponent } from '@fundamental-ngx/core/text';
import { BarModule } from '@fundamental-ngx/core/bar';
import { Employee, Department } from '../../models/employee';

@Component({
  selector: 'app-new-employee',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormModule,
    InputGroupModule,
    ButtonComponent,
    SelectModule,
    DatePickerComponent,
    MessageStripComponent,
    TitleComponent,
    TextComponent,
    BarModule
  ],
  templateUrl: './new-employee.html',
  styleUrl: './new-employee.scss'
})
export class NewEmployee {
  employeeForm: FormGroup;
  submitted = signal(false);
  isSubmitting = signal(false);

  departments: Department[] = [
    { id: 'eng', name: 'Engineering' },
    { id: 'sales', name: 'Sales' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'hr', name: 'Human Resources' },
    { id: 'finance', name: 'Finance' },
    { id: 'operations', name: 'Operations' }
  ];

  employmentTypes = ['Full-time', 'Part-time', 'Contract'];

  locations = [
    'New York, NY',
    'San Francisco, CA',
    'Austin, TX',
    'Chicago, IL',
    'Seattle, WA',
    'Boston, MA',
    'Remote'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
      department: ['', Validators.required],
      position: ['', [Validators.required, Validators.minLength(2)]],
      startDate: [new Date(), Validators.required],
      employmentType: ['Full-time', Validators.required],
      salary: ['', [Validators.min(0)]],
      manager: [''],
      'cost-center': [''],
      location: ['', Validators.required],
      status: ['Active', Validators.required]
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.employeeForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.employeeForm.controls).forEach(key => {
        this.employeeForm.controls[key].markAsTouched();
      });
      return;
    }

    this.isSubmitting.set(true);

    // Simulate API call
    setTimeout(() => {
      const employee: Employee = this.employeeForm.value;

      // Navigate back to employees list
      this.router.navigate(['/employees']);
    }, 1000);
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }

  hasError(fieldName: string): boolean {
    const field = this.employeeForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted()));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.employeeForm.get(fieldName);

    if (!field || !field.errors) {
      return '';
    }

    if (field.errors['required']) {
      return 'This field is required';
    }
    if (field.errors['email']) {
      return 'Please enter a valid email address';
    }
    if (field.errors['minlength']) {
      return `Minimum length is ${field.errors['minlength'].requiredLength} characters`;
    }
    if (field.errors['pattern']) {
      return 'Please enter a valid phone number';
    }
    if (field.errors['min']) {
      return 'Value must be greater than 0';
    }

    return 'Invalid value';
  }
}
