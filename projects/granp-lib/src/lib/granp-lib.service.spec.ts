import { TestBed } from '@angular/core/testing';

import { GranpLibService } from './granp-lib.service';

describe('GranpLibService', () => {
  let service: GranpLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GranpLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
