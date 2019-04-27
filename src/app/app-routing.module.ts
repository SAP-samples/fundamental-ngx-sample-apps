import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContractsComponent} from './components/contracts/contracts.component';
import {ProductsComponent} from './components/products/products.component';

const routes: Routes = [
    {path: 'contracts', component: ContractsComponent},
    {path: 'products', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
