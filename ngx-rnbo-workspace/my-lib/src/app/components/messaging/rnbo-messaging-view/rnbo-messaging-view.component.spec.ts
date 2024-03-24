import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnboMessagingViewComponent } from './rnbo-messaging-view.component';

describe('RnboMessagingViewComponent', () => {
  let component: RnboMessagingViewComponent;
  let fixture: ComponentFixture<RnboMessagingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RnboMessagingViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RnboMessagingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
