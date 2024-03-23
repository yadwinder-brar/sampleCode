import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalPrefComponent } from './arrival-pref.component';

describe('ArrivalPrefComponent', () => {
  let component: ArrivalPrefComponent;
  let fixture: ComponentFixture<ArrivalPrefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrivalPrefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrivalPrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
