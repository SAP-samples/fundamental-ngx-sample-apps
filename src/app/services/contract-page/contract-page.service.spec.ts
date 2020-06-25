import { TestBed } from '@angular/core/testing';

import { ContractPageService } from './contract-page.service';

describe('ContractPageService', () => {
  let service: ContractPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
