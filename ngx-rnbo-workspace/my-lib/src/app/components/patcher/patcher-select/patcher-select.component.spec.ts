import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatcherSelectComponent } from './patcher-select.component';

describe('PatcherSelectComponent', () => {
  let component: PatcherSelectComponent;
  let fixture: ComponentFixture<PatcherSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatcherSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatcherSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
