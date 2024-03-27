import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnboPresetsViewComponent } from './rnbo-presets-view.component';

describe('RnboPresetsViewComponent', () => {
  let component: RnboPresetsViewComponent;
  let fixture: ComponentFixture<RnboPresetsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RnboPresetsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RnboPresetsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
