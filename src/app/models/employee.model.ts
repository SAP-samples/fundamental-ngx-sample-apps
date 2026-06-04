export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  hireDate: Date;
  lastReviewDate?: Date;
  nextReviewDate?: Date;
  performanceRating?: number;
  status: 'Active' | 'On Leave' | 'Probation';
}

export interface PerformanceReview {
  employeeId: number;
  reviewDate: Date;
  reviewPeriodStart: Date;
  reviewPeriodEnd: Date;
  rating: number;
  strengths: string;
  areasForImprovement: string;
  goals: string;
  reviewerName: string;
}
