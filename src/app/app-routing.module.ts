import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { CoreFormComponent } from './core-form/core-form.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: 'simple-form', component: SimpleFormComponent},
  { path: 'core-form', component: CoreFormComponent},
  { path: 'main', component: LandingComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
