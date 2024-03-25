import { TestBed } from '@angular/core/testing';

import { MessagingUiService } from './messaging-ui.service';

describe('MessagingUiService', () => {
  let service: MessagingUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagingUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
