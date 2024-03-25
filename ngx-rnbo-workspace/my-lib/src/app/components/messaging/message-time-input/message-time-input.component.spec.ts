import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTimeInputComponent } from './message-time-input.component';

describe('MessageTimeInputComponent', () => {
  let component: MessageTimeInputComponent;
  let fixture: ComponentFixture<MessageTimeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageTimeInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
