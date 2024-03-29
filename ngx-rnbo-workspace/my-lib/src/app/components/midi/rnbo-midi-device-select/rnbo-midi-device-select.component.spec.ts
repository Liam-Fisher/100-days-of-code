import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnboMidiDeviceSelectComponent } from './rnbo-midi-device-select.component';

describe('RnboMidiDeviceSelectComponent', () => {
  let component: RnboMidiDeviceSelectComponent;
  let fixture: ComponentFixture<RnboMidiDeviceSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RnboMidiDeviceSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RnboMidiDeviceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
