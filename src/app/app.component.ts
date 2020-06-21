import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ProductSwitchItem, ShellbarUser, ShellbarUserMenu, DialogService } from '@fundamental-ngx/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router, private dialogService: DialogService,) {}
  title = 'Fundamental NGX Demo';
  actions = [];
  condensed: boolean = false;

  list: ProductSwitchItem[] = [
    {
        title: 'Home',
        subtitle: 'Central Home',
        icon: 'home',
    },
    {
        title: 'Analytics Cloud',
        subtitle: 'Analytics Cloud',
        icon: 'business-objects-experience'
    },
    {
        title: 'Catalog',
        subtitle: 'Ariba',
        icon: 'contacts'
    },
    {
        title: 'Guided Buying',
        icon: 'credit-card'
    },
    {
        title: 'Strategic Procurement',
        icon: 'cart-3'
    },
    {
        title: 'Vendor Managemen',
        subtitle: 'Fieldglass',
        icon: 'shipping-status'
    },
    {
        title: 'Human Capital Management',
        icon: 'customer'
    },
    {
        title: 'Sales Cloud',
        subtitle: 'Sales Cloud',
        icon: 'sales-notification'
    },
    {
        title: 'Commerce Cloud',
        subtitle: 'Commerce Cloud',
        icon: 'retail-store'
    },
    {
        title: 'Marketing Cloud',
        subtitle: 'Marketing Cloud',
        icon: 'marketing-campaign'
    },
    {
        title: 'Service Cloud',
        icon: 'family-care'
    },
    {
        title: 'S/4HANA',
        icon: 'batch-payments'
    },
];

  ngOnInit() {
    if(this.authService.isLoggedIn){
      this.actions  = [
        {
            glyph: 'employee-rejections',
            callback: () => {this.router.navigate(['auth']);},
            label: 'Sign Out'
        },
      ];
    }
    this.authService.userObserLoginObservable.subscribe(value => {
      if(!value) {
        this.actions = [
          {
              glyph: 'customer',
              callback: () => {this.router.navigate(['auth']);},
              label: 'Authentication'
          },
      ];
      } else if (value) {
        this.actions = [
          {
              glyph: 'employee-rejections',
              callback: () => {this.authService.logout()},
              label: 'Sign Out'
          }
        ];
      }
    })
  };

  productChangeHandle(products: ProductSwitchItem[]): void {
      this.list = products;
  };

  user: ShellbarUser = {
    initials: 'WW',
    image: 'https://placeimg.com/400/400/people'
  };

  userMenu: ShellbarUserMenu[] = [
      { text: 'Settings', callback: () => {
        console.log('before open');
        this.dialogService.open(ThemeSelectorComponent).afterClosed.subscribe(result => {
          if (result) {
            console.log("Closed theme selector");
          }
      }, () => { });
      } },
      { text: 'Sign Out', callback: () => this.router.navigate(['auth'])}
  ];

  settingsCallback() {
      alert('Settings Clicked');
  }

  openCreateModal(): void {
    this.dialogService.open(
        ThemeSelectorComponent, 
        {responsivePadding:true}).afterClosed.subscribe(result => {
        if (result) {
          console.log("Closed theme selector");
        }
    }, () => { });
}

}
