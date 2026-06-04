import { Component, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from '@fundamental-ngx/core/table';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { BarModule } from '@fundamental-ngx/core/bar';
import { FormModule } from '@fundamental-ngx/core/form';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { RatingIndicatorComponent } from '@fundamental-ngx/core/rating-indicator';
import { DialogModule, DialogService, DialogRef } from '@fundamental-ngx/core/dialog';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { InfoLabelComponent } from '@fundamental-ngx/core/info-label';
import { EmployeeService } from '../../services/employee';
import { Employee, PerformanceReview } from '../../models/employee.model';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonComponent,
    BarModule,
    FormModule,
    DatePickerComponent,
    RatingIndicatorComponent,
    DialogModule,
    TitleComponent,
    InfoLabelComponent
  ],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
})
export class Employees {
  private employeeService = inject(EmployeeService);
  private fb = inject(FormBuilder);
  private dialogService = inject(DialogService);

  @ViewChild('reviewDialog') reviewDialogTemplate!: TemplateRef<any>;

  protected dialogRef?: DialogRef;
  protected employees = this.employeeService.getEmployees;
  protected selectedEmployee = signal<Employee | null>(null);

  protected reviewForm = this.fb.group({
    reviewDate: [new Date(), Validators.required],
    reviewPeriodStart: [new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), Validators.required],
    reviewPeriodEnd: [new Date(), Validators.required],
    rating: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    strengths: ['', Validators.required],
    areasForImprovement: ['', Validators.required],
    goals: ['', Validators.required],
    reviewerName: ['John Smith', Validators.required]
  });

  openReviewDialog(employee: Employee): void {
    this.selectedEmployee.set(employee);

    this.dialogRef = this.dialogService.open(this.reviewDialogTemplate, {
      responsivePadding: true,
      hasBackdrop: true,
      escKeyCloseable: true,
      focusTrapped: true,
      width: '800px'
    });

    // Handle both close (success) and dismiss (cancel)
    this.dialogRef.afterClosed.subscribe(
      (result) => {
        // Dialog was closed with a result (submitted)
        this.resetForm();
      },
      () => {
        // Dialog was dismissed (cancelled)
        this.resetForm();
      }
    );
  }

  private resetForm(): void {
    this.reviewForm.reset({
      reviewDate: new Date(),
      reviewPeriodStart: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
      reviewPeriodEnd: new Date(),
      rating: 3,
      reviewerName: 'John Smith'
    });
  }

  submitReview(): void {
    if (this.reviewForm.valid && this.selectedEmployee()) {
      const formValue = this.reviewForm.value;

      // Helper function to convert FdDate or any date-like object to Date
      const toDate = (value: any): Date => {
        if (value instanceof Date) {
          return value;
        }
        if (value && typeof value === 'object' && 'toDate' in value) {
          // FdDate objects have a toDate() method
          return value.toDate();
        }
        if (value && typeof value === 'object' && 'date' in value) {
          // Some date pickers wrap the date in an object
          return new Date(value.date);
        }
        return new Date(value);
      };

      const review: PerformanceReview = {
        employeeId: this.selectedEmployee()!.id,
        reviewDate: toDate(formValue.reviewDate),
        reviewPeriodStart: toDate(formValue.reviewPeriodStart),
        reviewPeriodEnd: toDate(formValue.reviewPeriodEnd),
        rating: formValue.rating!,
        strengths: formValue.strengths!,
        areasForImprovement: formValue.areasForImprovement!,
        goals: formValue.goals!,
        reviewerName: formValue.reviewerName!
      };

      this.employeeService.submitReview(review);
      this.dialogRef?.close('Submitted');
    }
  }
}
