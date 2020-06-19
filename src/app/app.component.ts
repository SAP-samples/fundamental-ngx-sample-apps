import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ProductSwitchItem, ShellbarUser, ShellbarUserMenu } from '@fundamental-ngx/core';
import {AuthService} from './services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService, private router:  Router) {}
  title = 'ngx-sample-app';
  userMenu: ShellbarUserMenu[];
  user: ShellbarUser;
  actions = [
    {
        glyph: 'customer',
        callback: () => {this.router.navigate(['auth']);},
        label: 'Authentication'
    },
  ];

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
  }

  auth() {
    // this.router.navigate(['auth']);
  }

  productChangeHandle(products: ProductSwitchItem[]): void {
      this.list = products;
  }
}
