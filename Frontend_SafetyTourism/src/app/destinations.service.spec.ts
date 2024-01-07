import { TestBed } from '@angular/core/testing';

import { DestinationsService } from './destinations.service';

describe('DestinationsService', () => {
  let service: DestinationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
