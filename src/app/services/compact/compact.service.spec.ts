import { TestBed } from '@angular/core/testing';

import { CompactService } from './compact.service';

describe('CompactService', () => {
  let service: CompactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
