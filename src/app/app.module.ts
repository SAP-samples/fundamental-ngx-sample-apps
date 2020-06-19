import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CdkTableModule } from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {
    AlertModule,
    BadgeLabelModule,
    ButtonModule, DatePickerModule, FormModule, IconModule,
    InfoLabelModule,
    LayoutGridModule,
    BusyIndicatorModule, DialogModule, NestedListModule,
    LayoutPanelModule,
    ProductSwitchModule,
    ShellbarModule,
    SideNavigationModule,
    TableModule,
    InlineHelpModule,
    MultiInputModule,
    DialogRef,
    NotificationModule,
    IdentifierModule
} from '@fundamental-ngx/core';
import { ContractsComponent } from './components/contracts/contracts.component';
import { ProductsComponent } from './components/products/products.component';
import { StatusPipe } from './components/contracts/status.pipe';
import { CreateContractModalComponent } from './components/contracts/create-contract-modal/create-contract-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateProductModalComponent } from './components/products/create-product-modal/create-product-modal.component';
import { CreateProductModalDetailedComponent } from './components/products/create-product-modal/create-product-modal-detailed/create-product-modal-detailed.component';
import {ProductsService} from './services/products/products.service';
import {ContractsService} from './services/contracts/contracts.service';
import { NotificationConfirmationComponent } from './shared/notification-confirmation/notification-confirmation.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { ForgotPasswordComponent } from './components/auth/login/forgot-password/forgot-password.component';
import { StatusToColorPipe } from './shared/status-to-color.pipe';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        ContractsComponent,
        ProductsComponent,
        StatusPipe,
        CreateContractModalComponent,
        ConfirmModalComponent,
        DashboardComponent,
        CreateProductModalComponent,
        CreateProductModalDetailedComponent,
        NotificationConfirmationComponent,
        LoginComponent,
        ForgotPasswordComponent,
        StatusToColorPipe,
        
        

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        CdkTableModule, DragDropModule,
        SideNavigationModule,
        LayoutPanelModule,
        ButtonModule,
        TableModule,
        BadgeLabelModule,
        LayoutGridModule,
        BusyIndicatorModule,
        DialogModule,
        AlertModule,
        FormsModule,
        InfoLabelModule,
        ProductSwitchModule,
        MultiInputModule,
        NotificationModule,
        NestedListModule,
        IdentifierModule,
        InlineHelpModule,
        ReactiveFormsModule,
        FormModule,
        DatePickerModule,
        BrowserAnimationsModule,
        ShellbarModule,
        IconModule
    ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
      CookieService,
      ContractsService,
      ProductsService, 
      StatusToColorPipe
    ],
    entryComponents: [
        CreateContractModalComponent,
        ConfirmModalComponent,
        CreateProductModalComponent,
        CreateProductModalDetailedComponent,
        NotificationConfirmationComponent
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
