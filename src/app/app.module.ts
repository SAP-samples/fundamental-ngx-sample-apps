import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {
    AlertModule,
    AvatarModule,
    BusyIndicatorModule,
    ButtonModule, 
    DatePickerModule,  
    DialogModule,
    FormModule, 
    IconModule,
    InfoLabelModule,
    InlineHelpModule,
    LayoutGridModule, 
    LayoutPanelModule,
    ListModule,
    MultiInputModule,
    NestedListModule,
    NotificationModule,
    PaginationModule,
    ProductSwitchModule,
    PopoverModule,
    SelectModule,
    ShellbarModule,
    SideNavigationModule,
    TableModule,
    CheckboxModule,
    MenuModule,
} from '@fundamental-ngx/core';
import { ContractsComponent } from './components/contracts/contracts.component';
import { ProductsComponent } from './components/products/products.component';
import { StatusPipe } from './components/contracts/status.pipe';
import { CreateContractModalComponent } from './components/contracts/create-contract-modal/create-contract-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateProductModalComponent } from './components/products/create-product-modal/create-product-modal.component';
import { CreateProductModalDetailedComponent } from './components/products/create-product-modal/create-product-modal-detailed/create-product-modal-detailed.component';
import { ProductsService } from './services/products/products.service';
import { ContractsService } from './services/contracts/contracts.service';
import { NotificationConfirmationComponent } from './shared/notification-confirmation/notification-confirmation.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import {
  AngularFireStorageModule,
} from "@angular/fire/compat/storage";
import { ForgotPasswordComponent } from './components/auth/login/forgot-password/forgot-password.component';
import { StatusToColorPipe } from './shared/status-to-color.pipe';
import { CookieService } from 'ngx-cookie-service';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import {LuigiUiService} from './services/luigi-ui/luigi-ui.service';
import {CompactService} from './services/compact/compact.service';
import { SnakeCasePipe } from './pipes/snake-case.pipe';
import { LanguageTypePipe } from './pipes/language/language-type/language-type.pipe';
import { LanguageStatusPipe } from './pipes/language/language-status/language-status.pipe';
import { UsersComponent } from './components/users/users.component';

@NgModule({
    declarations: [
        AppComponent,
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
        ThemeSelectorComponent,
        SnakeCasePipe,
        LanguageTypePipe,
        LanguageStatusPipe,
        UsersComponent
    ],
    imports: [
        AlertModule,
        AvatarModule,
        BrowserAnimationsModule,
        BrowserModule,
        BusyIndicatorModule,
        ButtonModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        AngularFirestoreModule,
        AppRoutingModule,
        CdkTableModule,
        CheckboxModule,
        DatePickerModule,
        DialogModule,
        DragDropModule,
        FormModule,
        FormsModule,
        IconModule,
        InfoLabelModule,
        InlineHelpModule,
        LayoutGridModule,
        LayoutPanelModule,
        ListModule,
        MenuModule,
        MultiInputModule,
        NestedListModule,
        NotificationModule,
        PaginationModule,
        PopoverModule,
        ProductSwitchModule,
        ReactiveFormsModule,
        SelectModule,
        SideNavigationModule,
        ShellbarModule,
        TableModule
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
        CookieService,
        CompactService,
        ContractsService,
        ProductsService,
        StatusToColorPipe,
        LanguageTypePipe,
        LanguageStatusPipe,
        LuigiUiService,
        SnakeCasePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
