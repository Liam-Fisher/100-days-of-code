import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdSelectComponent } from './id-select.component';

describe('IdSelectComponent', () => {
  let component: IdSelectComponent;
  let fixture: ComponentFixture<IdSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
