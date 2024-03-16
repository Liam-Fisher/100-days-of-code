import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnboDeviceComponent } from './rnbo-device.component';

describe('RnboDeviceComponent', () => {
  let component: RnboDeviceComponent;
  let fixture: ComponentFixture<RnboDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RnboDeviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RnboDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
