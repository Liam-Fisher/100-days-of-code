import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnboBuffersViewComponent } from './rnbo-buffers-view.component';

describe('RnboBuffersViewComponent', () => {
  let component: RnboBuffersViewComponent;
  let fixture: ComponentFixture<RnboBuffersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RnboBuffersViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RnboBuffersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
