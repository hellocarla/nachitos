import { TestBed } from '@angular/core/testing';

import { SurtoService } from './surto.service';

describe('SurtoService', () => {
  let service: SurtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
