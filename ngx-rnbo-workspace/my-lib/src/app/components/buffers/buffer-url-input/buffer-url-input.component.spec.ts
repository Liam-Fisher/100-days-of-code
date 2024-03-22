import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferUrlInputComponent } from './buffer-url-input.component';

describe('BufferUrlInputComponent', () => {
  let component: BufferUrlInputComponent;
  let fixture: ComponentFixture<BufferUrlInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BufferUrlInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BufferUrlInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
