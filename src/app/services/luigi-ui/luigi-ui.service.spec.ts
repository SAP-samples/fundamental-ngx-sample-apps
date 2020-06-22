import { TestBed } from '@angular/core/testing';

import { LuigiUiService } from './luigi-ui.service';

describe('LuigiUiService', () => {
  let service: LuigiUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuigiUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
