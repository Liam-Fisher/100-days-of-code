import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnboMidiViewComponent } from './rnbo-midi-view.component';

describe('RnboMidiViewComponent', () => {
  let component: RnboMidiViewComponent;
  let fixture: ComponentFixture<RnboMidiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RnboMidiViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RnboMidiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
