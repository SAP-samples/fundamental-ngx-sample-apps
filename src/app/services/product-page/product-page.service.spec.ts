import { TestBed } from '@angular/core/testing';

import { ProductPageService } from './product-page.service';

describe('ProductPageService', () => {
  let service: ProductPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
