import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetCreateInputComponent } from './preset-create-input.component';

describe('PresetCreateInputComponent', () => {
  let component: PresetCreateInputComponent;
  let fixture: ComponentFixture<PresetCreateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresetCreateInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresetCreateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
