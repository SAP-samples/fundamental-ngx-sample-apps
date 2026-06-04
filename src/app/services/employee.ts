import { Injectable, signal } from '@angular/core';
import { Employee, PerformanceReview } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees = signal<Employee[]>([
    {
      id: 1,
      firstName: 'Anna',
      lastName: 'Petrova',
      email: 'anna.petrova@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      hireDate: new Date('2020-03-15'),
      lastReviewDate: new Date('2025-12-10'),
      nextReviewDate: new Date('2026-06-10'),
      performanceRating: 4.5,
      status: 'Active'
    },
    {
      id: 2,
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@company.com',
      department: 'Sales',
      position: 'Account Executive',
      hireDate: new Date('2021-07-01'),
      lastReviewDate: new Date('2026-01-15'),
      nextReviewDate: new Date('2026-07-15'),
      performanceRating: 4.0,
      status: 'Active'
    },
    {
      id: 3,
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria.garcia@company.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      hireDate: new Date('2019-11-20'),
      lastReviewDate: new Date('2025-11-20'),
      nextReviewDate: new Date('2026-05-20'),
      performanceRating: 4.8,
      status: 'Active'
    },
    {
      id: 4,
      firstName: 'Ivan',
      lastName: 'Dimitrov',
      email: 'ivan.dimitrov@company.com',
      department: 'Engineering',
      position: 'Junior Developer',
      hireDate: new Date('2024-02-01'),
      nextReviewDate: new Date('2026-08-01'),
      performanceRating: 3.5,
      status: 'Probation'
    },
    {
      id: 5,
      firstName: 'Sophie',
      lastName: 'Martin',
      email: 'sophie.martin@company.com',
      department: 'HR',
      position: 'HR Business Partner',
      hireDate: new Date('2018-05-10'),
      lastReviewDate: new Date('2025-10-10'),
      nextReviewDate: new Date('2026-04-10'),
      performanceRating: 4.7,
      status: 'Active'
    },
    {
      id: 6,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@company.com',
      department: 'Engineering',
      position: 'Tech Lead',
      hireDate: new Date('2017-09-01'),
      lastReviewDate: new Date('2025-09-01'),
      nextReviewDate: new Date('2026-03-01'),
      performanceRating: 5.0,
      status: 'Active'
    },
    {
      id: 7,
      firstName: 'Elena',
      lastName: 'Ivanova',
      email: 'elena.ivanova@company.com',
      department: 'Sales',
      position: 'Sales Director',
      hireDate: new Date('2016-01-15'),
      lastReviewDate: new Date('2026-01-15'),
      nextReviewDate: new Date('2026-07-15'),
      performanceRating: 4.9,
      status: 'On Leave'
    },
    {
      id: 8,
      firstName: 'Thomas',
      lastName: 'Bernard',
      email: 'thomas.bernard@company.com',
      department: 'Marketing',
      position: 'Content Specialist',
      hireDate: new Date('2022-08-20'),
      lastReviewDate: new Date('2025-08-20'),
      nextReviewDate: new Date('2026-02-20'),
      performanceRating: 4.2,
      status: 'Active'
    }
  ]);

  getEmployees = this.employees.asReadonly();

  addEmployee(employee: Employee): void {
    this.employees.update(emps => [...emps, { ...employee, id: Math.max(...emps.map(e => e.id)) + 1 }]);
  }

  updateEmployee(id: number, updates: Partial<Employee>): void {
    this.employees.update(emps =>
      emps.map(emp => emp.id === id ? { ...emp, ...updates } : emp)
    );
  }

  deleteEmployee(id: number): void {
    this.employees.update(emps => emps.filter(emp => emp.id !== id));
  }

  submitReview(review: PerformanceReview): void {
    this.updateEmployee(review.employeeId, {
      lastReviewDate: review.reviewDate,
      performanceRating: review.rating,
      nextReviewDate: new Date(review.reviewDate.getTime() + 180 * 24 * 60 * 60 * 1000) // 6 months later
    });
  }
}
