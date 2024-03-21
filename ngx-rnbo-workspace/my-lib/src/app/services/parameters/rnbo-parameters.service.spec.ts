import { TestBed } from '@angular/core/testing';

import { RnboParametersService } from './rnbo-parameters.service';

describe('RnboParametersService', () => {
  let service: RnboParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnboParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
