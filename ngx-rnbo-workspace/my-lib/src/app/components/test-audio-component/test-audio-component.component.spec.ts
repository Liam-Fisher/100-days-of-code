import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAudioComponentComponent } from './test-audio-component.component';

describe('TestAudioComponentComponent', () => {
  let component: TestAudioComponentComponent;
  let fixture: ComponentFixture<TestAudioComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAudioComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestAudioComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
