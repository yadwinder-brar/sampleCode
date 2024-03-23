import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierPrefComponent } from './carrier-pref.component';

describe('CarrierPrefComponent', () => {
  let component: CarrierPrefComponent;
  let fixture: ComponentFixture<CarrierPrefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrierPrefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrierPrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
