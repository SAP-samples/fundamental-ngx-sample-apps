import { Component, OnInit } from '@angular/core';
import { ProductSwitchItem } from '@fundamental-ngx/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Customers Insights';
  condensed= false;
    // Dynamic parameters for this component's route: /example-params/:first/:second
    routeParams: Params;

    // Query parameters found in the URL: /example-params/one/two?query1=one&query2=two
    queryParams: Params;

    name: any;

    constructor(private activatedRoute: ActivatedRoute){

    }

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
        this.activatedRoute.params.subscribe( params => {
            this.routeParams = params;
            console.log("routeParams:", this.routeParams);
        });

        // URL query parameters
        this.activatedRoute.queryParams.subscribe( params => {
            this.queryParams = params;
            console.log("queryParams", this.queryParams);
            if(this.queryParams && this.queryParams[`sap-theme`]){
                var a: any = document.getElementById("themes");
                console.log(">>>", a);
                if(this.queryParams[`sap-theme`] === 'sap_fiori_3'){
                    a.x = '/assets/light.css';
                } else if (this.queryParams[`sap-theme`] === 'sap_fiori_3_dark'){
                    a.x = '/assets/dark.css';
                }
                a.href = a.x;
            }
            // var a: any = document.getElementById("themes");
            // a.x = '/assets/light.css' == a.x ? '/assets/dark.css' : '/assets/light.css'; 
            // a.href = a.x;
        });

    }

    getRouteParams() {

        // Route parameters
        // this.activatedRoute.params.subscribe( params => {
        //     this.routeParams = params;
        //     console.log("routeParams:", this.routeParams);
        // });

        // // URL query parameters
        // this.activatedRoute.queryParams.subscribe( params => {
        //     this.queryParams = params;
        //     console.log("queryParams", this.queryParams);
        // });
    }

    productChangeHandle(products: ProductSwitchItem[]): void {
        this.list = products;
    }

    toggle(){
        var a: any = document.getElementById("themes");
        a.x = '/assets/light.css' == a.x ? '/assets/dark.css' : '/assets/light.css'; 
        a.href = a.x;
    }
}
