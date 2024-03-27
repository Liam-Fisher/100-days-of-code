import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeattimeInputComponent } from './beattime-input.component';

describe('BeattimeInputComponent', () => {
  let component: BeattimeInputComponent;
  let fixture: ComponentFixture<BeattimeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeattimeInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeattimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
