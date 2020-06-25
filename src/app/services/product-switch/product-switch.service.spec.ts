import { TestBed } from '@angular/core/testing';
import {ProductSwitchDataService} from './product-switch.service';


describe('ProductSwitchDataService', () => {
  let service: ProductSwitchDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSwitchDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
