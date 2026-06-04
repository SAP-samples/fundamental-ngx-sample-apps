import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Employees } from './pages/employees/employees';
import { NewEmployee } from './pages/new-employee/new-employee';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'employees', component: Employees },
  { path: 'new-employee', component: NewEmployee },
];
