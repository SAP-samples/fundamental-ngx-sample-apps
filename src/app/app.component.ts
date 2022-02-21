import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { SafeResourceUrl } from "@angular/platform-browser";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Subscription } from 'rxjs';

import { ProductSwitchItem, ShellbarUser, ShellbarUserMenu, DialogService } from '@fundamental-ngx/core';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { LuigiUiService } from './services/luigi-ui/luigi-ui.service';
import { CompactService } from './services/compact/compact.service';
import { SideNavModel } from './services/side-navigation/side-navigation.model';
import { MainService } from './services/main/main.service';
import { LanguageService } from './services/language/language.service';
import { ThemesService } from "@fundamental-ngx/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ThemesService]
})
export class AppComponent implements OnInit {

  globalCompact:boolean = false;
  imageUrl;
  accountSubscription: Subscription;

  cssUrl: SafeResourceUrl;
  cssCustomUrl: SafeResourceUrl;
  
  constructor(
    private luigiUiService: LuigiUiService,
    private authService: AuthService,
    private compactService: CompactService,
    private _main: MainService,
    private _languageService: LanguageService,
    private router: Router,
    private dialogService: DialogService,
    private _storage: AngularFireStorage,
    private _themesService: ThemesService
    ) {}

  title = 'Fundamental NGX Demo';
  sideNavMain: SideNavModel[] = [];
  sideNavSecondary: SideNavModel[] = [];
  luigiOption: boolean = false;
  settings = {
    theme: 'sap_fiori_3', 
    mode: 'cozy'
  };
  mobile = true;
  condensed: boolean = false;

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
             this.cssUrl = this._themesService.setTheme(result.theme);
             this.cssCustomUrl = this._themesService.setCustomTheme(result.theme);
            }
          }, () => { });
          } },
          { text: 'Sign In', callback: () => this.router.navigate(['auth'])}
        ];

  ngOnInit() {
    if (screen.width >= 768) {
      this.mobile = false;
    }

    this._languageService.lang.subscribe(lang => {
      this._main.main.subscribe(mainInfo => {
        this.title = mainInfo.title;
        this.list = Object.keys(mainInfo.productSwitch).map(i => mainInfo.productSwitch[i]);
        this.sideNavMain = mainInfo.sideNav[0].primary;
        this.sideNavSecondary = mainInfo.sideNav[1].secondary;
      });
    })

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
      if (account.first != null) {
        this.user = {
          initials: account.first.charAt(0).toLocaleLowerCase() + account.last.charAt(0).toLocaleLowerCase(),
          image: account.images
        };
      } else {
        this.user = {
          initials: '',
        };
      }
    });
  }

  productChangeHandle(products: ProductSwitchItem[]): void {
      this.list = products;
  }
}
