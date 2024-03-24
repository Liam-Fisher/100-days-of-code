import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInputToggleComponent } from './message-input-toggle.component';

describe('MessageInputToggleComponent', () => {
  let component: MessageInputToggleComponent;
  let fixture: ComponentFixture<MessageInputToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageInputToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageInputToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
