import { TestBed } from '@angular/core/testing';

import { RnboMidiService } from './rnbo-midi.service';

describe('RnboMidiService', () => {
  let service: RnboMidiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnboMidiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
