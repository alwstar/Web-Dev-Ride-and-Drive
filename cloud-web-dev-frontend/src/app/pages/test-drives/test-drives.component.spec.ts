import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDrivesComponent } from './test-drives.component';

describe('TestDrivesComponent', () => {
  let component: TestDrivesComponent;
  let fixture: ComponentFixture<TestDrivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDrivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestDrivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
