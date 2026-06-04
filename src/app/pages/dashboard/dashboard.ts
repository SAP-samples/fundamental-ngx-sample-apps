import { Component, inject, computed } from '@angular/core';
import { TileModule } from '@fundamental-ngx/core/tile';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-dashboard',
  imports: [TileModule, TitleComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private employeeService = inject(EmployeeService);

  protected employees = this.employeeService.getEmployees;

  protected totalEmployees = computed(() => this.employees().length);

  protected activeEmployees = computed(() =>
    this.employees().filter(e => e.status === 'Active').length
  );

  protected avgRating = computed(() => {
    const ratings = this.employees()
      .filter(e => e.performanceRating)
      .map(e => e.performanceRating!);
    return ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : '0.0';
  });

  protected upcomingReviews = computed(() =>
    this.employees().filter(e => e.nextReviewDate &&
      e.nextReviewDate <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length
  );
}
