import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageFoldersComponent } from './storage-folders.component';

describe('StorageFoldersComponent', () => {
  let component: StorageFoldersComponent;
  let fixture: ComponentFixture<StorageFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageFoldersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StorageFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
