import {Component, OnInit, OnDestroy} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {Contract} from '../../models/contract.model';
import {Product} from '../../models/product.model';
import {ContractsService} from 'src/app/services/contracts/contracts.service';
import {ProductsService} from 'src/app/services/products/products.service';
import {ContractPageService} from 'src/app/services/contract-page/contract-page.service';
import {ProductPageService} from 'src/app/services/product-page/product-page.service';

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
      private contractPageData: ContractPageService,
      private productPageData: ProductPageService) {
    }

    ngOnInit() {
      this.subscriptionProduct = this.productService.getItems().subscribe(data => {
        const databaseData = Object.keys(data).map(i => data[i]);
        this.products = databaseData;
      });
      this.subscriptionContract = this.contractService.getContractsObservable().subscribe(data => {
        const databaseData = Object.keys(data).map(i => data[i]);
        this.contracts = databaseData;
      });

      this.contractPageData.contractData.subscribe(data => {
        this.contract = {title: data.title, description: data.description};
      });

      this.productPageData.productData.subscribe(data => {
        this.product = {title: data.title, description: data.description};
      });
    }

    ngOnDestroy() {
      this.subscriptionProduct.unsubscribe();
      this.subscriptionContract.unsubscribe();
    }
}
