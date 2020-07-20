import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContractsComponent} from './components/contracts/contracts.component';
import {ProductsComponent} from './components/products/products.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/auth/login/login.component';
import {UsersComponent} from './components/users/users.component';

const routes: Routes = [
  { path: 'auth', component:  LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'contracts', component: ContractsComponent},
  {path: 'products', component: ProductsComponent},
  { path: 'users', component:  UsersComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**',  redirectTo:  'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
