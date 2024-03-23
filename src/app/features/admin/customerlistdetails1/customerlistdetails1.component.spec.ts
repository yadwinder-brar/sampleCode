import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Customerlistdetails1Component } from './customerlistdetails1.component';

describe('Customerlistdetails1Component', () => {
  let component: Customerlistdetails1Component;
  let fixture: ComponentFixture<Customerlistdetails1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Customerlistdetails1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Customerlistdetails1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
