import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ProductSwitchItem, ShellbarUser, ShellbarUserMenu, DialogService } from '@fundamental-ngx/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import {LuigiUiService} from './services/luigi-ui/luigi-ui.service';
import {CompactService} from './services/compact/compact.service';
import {ProductSwitchDataService} from './services/product-switch/product-switch.service';
import {SideNavigationService} from './services/side-navigation/side-navigation.service';
import {SideNavModel} from './services/side-navigation/side-navigation.model';
import {AngularFireStorage} from '@angular/fire/storage';
import {Subscription} from 'rxjs';
import {takeUntil, take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  globalCompact:boolean = false;
  imageUrl;
  accountSubscription: Subscription;
  constructor(
    private luigiUiService: LuigiUiService,
    private authService: AuthService,
    private compactService: CompactService,
    private productSwitchData: ProductSwitchDataService,
    private sideNavData: SideNavigationService,
    private router: Router,
    private dialogService: DialogService,
    private sanitizer: DomSanitizer,
    private _storage: AngularFireStorage
    ) {}

  title = 'Fundamental NGX Demo';
  sideNavMain: SideNavModel[] = [];
  sideNavSecondary: SideNavModel[] = [];
  luigiOption: boolean = false;
  settings = {
    theme: 'sap_fiori_3', 
    mode: 'cozy'
  };
  condensed: boolean = false;

  cssUrl: SafeResourceUrl;

  list: ProductSwitchItem[] = [];

  user: ShellbarUser = {
    initials: ''
  };

  userMenu: ShellbarUserMenu[] = [
      { text: 'Settings', callback: () => {
        this.dialogService.open(
          ThemeSelectorComponent,
          { responsivePadding: true,
            data: this.settings})
          .afterClosed.subscribe(result => {
            if (result) {
             this.luigiUiService.updateLuigiUi(result.luigi);
             this.globalCompact = result.compact;
             this.compactService.updateCompact(result.compact);
              this.settings = result;
              this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/' + this.settings.theme + '.css');
            }
          }, () => { });
          } },
          { text: 'Sign In', callback: () => this.router.navigate(['auth'])}
        ];

  ngOnInit() {
    this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/sap_fiori_3.css');
    this.productSwitchData.productSwitchData.subscribe(data => {
      const productSwitchDataFromDb = Object.keys(data.products).map(i => data.products[i]);
      this.list = productSwitchDataFromDb;
    });

    this.sideNavData.sideNavigationData.subscribe(sideNav => {
      this.sideNavMain = sideNav.main;
      this.sideNavSecondary = sideNav.secondary;
    }, error => {
      console.log(error);
    });

    this.luigiUiService.luigiOption.subscribe(luigiOption => {
      this.luigiOption = luigiOption;
    });
    
    if (!this.authService.isLoggedIn) {
      this.userMenu[1] = { text: 'Sign In', callback: () => this.router.navigate(['auth'])};
    } else {
      this.userMenu[1] = { text: 'Sign Out', callback: () => this.authService.logout()};
    }
    this.authService.userObserLoginObservable.subscribe(value => {
      if (!value) {
        this.userMenu[1] = { text: 'Sign In', callback: () => this.router.navigate(['auth'])};
      } else {
        this.userMenu[1] = { text: 'Sign Out', callback: () => this.authService.logout()};
      }
    });
    this.authService.account.subscribe(account => {
      this.user = {
        initials: account.first.charAt(0).toLocaleLowerCase() + account.last.charAt(0).toLocaleLowerCase(),
        image: account.images
      };
    });
  }

  productChangeHandle(products: ProductSwitchItem[]): void {
      this.list = products;
  }
}
