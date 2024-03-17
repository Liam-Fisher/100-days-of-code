import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioControlPanelComponent } from './audio-control-panel.component';

describe('AudioControlPanelComponent', () => {
  let component: AudioControlPanelComponent;
  let fixture: ComponentFixture<AudioControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioControlPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudioControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
