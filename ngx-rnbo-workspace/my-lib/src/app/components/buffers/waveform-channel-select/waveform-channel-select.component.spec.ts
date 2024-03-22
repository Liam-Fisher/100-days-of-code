import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveformChannelSelectComponent } from './waveform-channel-select.component';

describe('WaveformChannelSelectComponent', () => {
  let component: WaveformChannelSelectComponent;
  let fixture: ComponentFixture<WaveformChannelSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaveformChannelSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaveformChannelSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
