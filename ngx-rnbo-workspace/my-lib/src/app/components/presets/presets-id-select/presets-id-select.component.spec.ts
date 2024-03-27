import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetsIdSelectComponent } from './presets-id-select.component';

describe('PresetsIdSelectComponent', () => {
  let component: PresetsIdSelectComponent;
  let fixture: ComponentFixture<PresetsIdSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresetsIdSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresetsIdSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
