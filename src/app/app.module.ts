import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { CoreFormComponent } from './core-form/core-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { LandingComponent } from './landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';
import { PlatformFormComponent } from './platform-form/platform-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RtlService } from '@fundamental-ngx/core/utils';
import { WizardFormComponent } from './wizard-form/wizard-form.component';
import { RegistrationService } from './services/registration.service'




@NgModule({
  declarations: [
    AppComponent,
    SimpleFormComponent,
    LandingComponent,
    CoreFormComponent,
    ReactiveFormComponent,
    PlatformFormComponent,
    WizardFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    FundamentalNgxPlatformModule,
    FundamentalNgxCoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CdkTableModule,
    DragDropModule,
  ],
  providers: [  RtlService, RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
