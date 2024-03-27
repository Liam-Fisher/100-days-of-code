import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportToggleComponent } from './transport-toggle.component';

describe('TransportToggleComponent', () => {
  let component: TransportToggleComponent;
  let fixture: ComponentFixture<TransportToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransportToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
