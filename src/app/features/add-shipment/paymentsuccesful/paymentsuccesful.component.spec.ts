import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsuccesfulComponent } from './paymentsuccesful.component';

describe('PaymentsuccesfulComponent', () => {
  let component: PaymentsuccesfulComponent;
  let fixture: ComponentFixture<PaymentsuccesfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsuccesfulComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsuccesfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
