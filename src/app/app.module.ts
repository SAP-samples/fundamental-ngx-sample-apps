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
    LoadingSpinnerModule, ModalModule,NestedListModule,
    PanelModule,
    ProductSwitchModule,
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
import {ProductsService} from './services/products/products.service';
import {ContractsService} from './services/contracts/contracts.service';



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
        CreateProductModalDetailedComponent
        

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        CdkTableModule, DragDropModule,
        SideNavigationModule,
        PanelModule,
        ButtonModule,
        TableModule,
        BadgeLabelModule,
        LoadingSpinnerModule,
        ModalModule,
        AlertModule,
        FormsModule,
        ProductSwitchModule,
        MultiInputModule,
        NestedListModule,
        InlineHelpModule,
        ReactiveFormsModule,
        FormModule,
        DatePickerModule,
        BrowserAnimationsModule,
        ShellbarModule,
        IconModule
    ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},ProductsService, ContractsService],
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
