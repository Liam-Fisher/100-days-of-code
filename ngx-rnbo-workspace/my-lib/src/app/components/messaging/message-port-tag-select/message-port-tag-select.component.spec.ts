import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePortTagSelectComponent } from './message-port-tag-select.component';

describe('MessagePortTagSelectComponent', () => {
  let component: MessagePortTagSelectComponent;
  let fixture: ComponentFixture<MessagePortTagSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagePortTagSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagePortTagSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
