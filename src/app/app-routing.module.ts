import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { SimpleFormStylesComponent } from './simple-form-styles/simple-form-styles.component';
import { CoreFormComponent } from './core-form/core-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { PlatformFormComponent } from './platform-form/platform-form.component';
import { LandingComponent } from './landing/landing.component';
import { WizardFormComponent} from './wizard-form/wizard-form.component';

const routes: Routes = [
  { path: 'simple-form', component: SimpleFormComponent},
  { path: 'simple-form-styles', component: SimpleFormStylesComponent},
  { path: 'core-form', component: CoreFormComponent},
  { path: 'reactive-form', component: ReactiveFormComponent},
  {path: 'platform-form', component:PlatformFormComponent},
  { path: 'main', component: LandingComponent},
  {path: 'wizard-form', component:WizardFormComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
