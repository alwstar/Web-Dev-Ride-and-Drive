import { TestBed } from '@angular/core/testing';

import { CarFinderService } from './car-finder.service';

describe('CarFinderService', () => {
  let service: CarFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
