import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InportContainerComponent } from './inport-container.component';

describe('InportContainerComponent', () => {
  let component: InportContainerComponent;
  let fixture: ComponentFixture<InportContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InportContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InportContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
