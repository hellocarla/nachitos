import { TestBed } from '@angular/core/testing';

import { VirusService } from './virus.service';

describe('VirusService', () => {
  let service: VirusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
