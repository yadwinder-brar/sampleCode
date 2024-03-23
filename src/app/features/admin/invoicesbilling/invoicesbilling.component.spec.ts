import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesbillingComponent } from './invoicesbilling.component';

describe('InvoicesbillingComponent', () => {
  let component: InvoicesbillingComponent;
  let fixture: ComponentFixture<InvoicesbillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesbillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicesbillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
