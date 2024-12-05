import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperCarFinderComponent } from './super-car-finder.component';

describe('SuperCarFinderComponent', () => {
  let component: SuperCarFinderComponent;
  let fixture: ComponentFixture<SuperCarFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperCarFinderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperCarFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
