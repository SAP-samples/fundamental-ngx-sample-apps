import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {ShellbarComponent} from './components/shellbar/shellbar.component';
import {
    AlertModule,
    BadgeLabelModule,
    ButtonModule, DatePickerModule, FormModule, IconModule,
    LoadingSpinnerModule, ModalModule,
    PanelModule,
    ShellbarModule,
    SideNavigationModule,
    TableModule,
    InlineHelpModule,
    MultiInputModule
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
@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        ShellbarComponent,
        ContractsComponent,
        ProductsComponent,
        StatusPipe,
        CreateContractModalComponent,
        ConfirmModalComponent,
        DashboardComponent,
        CreateProductModalComponent,
        CreateProductModalDetailedComponent
        
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        SideNavigationModule,
        ShellbarModule,
        PanelModule,
        ButtonModule,
        TableModule,
        BadgeLabelModule,
        LoadingSpinnerModule,
        ModalModule,
        AlertModule,
        FormsModule,
        MultiInputModule,
        InlineHelpModule,
        ReactiveFormsModule,
        FormModule,
        DatePickerModule,
        BrowserAnimationsModule,
        IconModule
    ],
    providers: [],
    entryComponents: [
        CreateContractModalComponent,
        ConfirmModalComponent,
        CreateProductModalComponent,
        CreateProductModalDetailedComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
