import { TestBed } from '@angular/core/testing';

import { FileInputService } from './file-input.service';

describe('FileInputService', () => {
  let service: FileInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
