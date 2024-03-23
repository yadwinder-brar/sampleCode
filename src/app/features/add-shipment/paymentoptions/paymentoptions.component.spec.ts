import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentoptionsComponent } from './paymentoptions.component';

describe('PaymentoptionsComponent', () => {
  let component: PaymentoptionsComponent;
  let fixture: ComponentFixture<PaymentoptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentoptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
