import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContractsComponent} from './components/contracts/contracts.component';
import {ProductsComponent} from './components/products/products.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'contracts', component: ContractsComponent},
    {path: 'products', component: ProductsComponent},
    {path: '**',  redirectTo:  'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
