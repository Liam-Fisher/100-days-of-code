import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnboTimingViewComponent } from './rnbo-timing-view.component';

describe('RnboTimingViewComponent', () => {
  let component: RnboTimingViewComponent;
  let fixture: ComponentFixture<RnboTimingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RnboTimingViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RnboTimingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
