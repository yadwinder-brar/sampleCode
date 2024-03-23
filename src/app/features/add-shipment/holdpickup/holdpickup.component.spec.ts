import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldpickupComponent } from './holdpickup.component';

describe('HoldpickupComponent', () => {
  let component: HoldpickupComponent;
  let fixture: ComponentFixture<HoldpickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoldpickupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoldpickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
