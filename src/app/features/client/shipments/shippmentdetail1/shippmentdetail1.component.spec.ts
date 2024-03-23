import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shippmentdetail1Component } from './shippmentdetail1.component';

describe('Shippmentdetail1Component', () => {
  let component: Shippmentdetail1Component;
  let fixture: ComponentFixture<Shippmentdetail1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Shippmentdetail1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shippmentdetail1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
