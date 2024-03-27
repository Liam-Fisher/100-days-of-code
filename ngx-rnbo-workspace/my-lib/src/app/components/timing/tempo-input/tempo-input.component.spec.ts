import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempoInputComponent } from './tempo-input.component';

describe('TempoInputComponent', () => {
  let component: TempoInputComponent;
  let fixture: ComponentFixture<TempoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempoInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TempoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
