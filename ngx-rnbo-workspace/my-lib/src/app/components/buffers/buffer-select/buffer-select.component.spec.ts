import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferSelectComponent } from './buffer-select.component';

describe('BufferSelectComponent', () => {
  let component: BufferSelectComponent;
  let fixture: ComponentFixture<BufferSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BufferSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BufferSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
