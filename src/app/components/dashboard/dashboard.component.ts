import {Component, OnInit, OnDestroy} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {Contract} from '../../models/contract.model';
import {Product} from '../../models/product.model';
import {ContractsService} from 'src/app/services/contracts/contracts.service';
import {ProductsService} from 'src/app/services/products/products.service';
import {ContractPageService} from 'src/app/services/contract-page/contract-page.service';
import {ProductPageService} from 'src/app/services/product-page/product-page.service';
import {MainService} from 'src/app/services/main/main.service';
import {LanguageService} from 'src/app/services/language/language.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    contract: {title: string, description: string} = {title:'', description: ''};
    product: {title: string, description: string} = {title:'', description: ''};
    contracts: Contract[];
    products: Product[];
    subscriptionContract: Subscription;
    subscriptionProduct: Subscription;
    
    constructor(
      public productService:ProductsService,
      public contractService: ContractsService,
      private _main: MainService,
      private _languageService: LanguageService) {
    }

    ngOnInit() {
      this.subscriptionProduct = this.productService.products.subscribe(data => {
        const databaseData = Object.keys(data).map(i => data[i]); // to transfer a json object into an array
        this.products = databaseData;
      });
      this.subscriptionContract = this.contractService.getContractsObservable().subscribe(data => {
        const databaseData = Object.keys(data).map(i => data[i]);
        this.contracts = databaseData;
      });

      this._languageService.lang.subscribe(lang => {
        this._main.main.subscribe(mainInfo => {
          this.contract = mainInfo.contract;
          this.product = mainInfo.product;
        });
      });
    }

    ngOnDestroy() {
      this.subscriptionProduct.unsubscribe();
      this.subscriptionContract.unsubscribe();
    }
}
