import { TestBed } from '@angular/core/testing';

import { RepeatedServicesService } from './repeated-services.service';

describe('RepeatedServicesService', () => {
  let service: RepeatedServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepeatedServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
