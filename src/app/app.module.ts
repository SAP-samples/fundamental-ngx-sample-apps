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
import {BadgeLabelModule, ButtonModule, PanelModule, ShellbarModule, SideNavigationModule, TableModule} from 'fundamental-ngx';
import { ContractsComponent } from './components/contracts/contracts.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        ShellbarComponent,
        ContractsComponent,
        ProductsComponent
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
        BadgeLabelModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
