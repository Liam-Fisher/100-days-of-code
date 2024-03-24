import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePortContainerComponent } from './message-port-container.component';

describe('MessagePortContainerComponent', () => {
  let component: MessagePortContainerComponent;
  let fixture: ComponentFixture<MessagePortContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagePortContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagePortContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
