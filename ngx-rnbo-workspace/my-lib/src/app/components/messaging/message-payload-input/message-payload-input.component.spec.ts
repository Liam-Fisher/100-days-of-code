import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePayloadInputComponent } from './message-payload-input.component';

describe('MessagePayloadInputComponent', () => {
  let component: MessagePayloadInputComponent;
  let fixture: ComponentFixture<MessagePayloadInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagePayloadInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagePayloadInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
