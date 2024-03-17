import { TestBed } from '@angular/core/testing';

import { WebAudioService } from './web-audio.service';

describe('WebAudioService', () => {
  let service: WebAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
