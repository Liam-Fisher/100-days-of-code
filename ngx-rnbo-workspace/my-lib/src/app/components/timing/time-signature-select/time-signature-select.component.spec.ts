import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSignatureSelectComponent } from './time-signature-select.component';

describe('TimeSignatureSelectComponent', () => {
  let component: TimeSignatureSelectComponent;
  let fixture: ComponentFixture<TimeSignatureSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSignatureSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeSignatureSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
