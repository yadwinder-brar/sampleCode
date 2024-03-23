import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProInvoiceDialogComponent } from './pro-invoice-dialog.component';

describe('ProInvoiceDialogComponent', () => {
  let component: ProInvoiceDialogComponent;
  let fixture: ComponentFixture<ProInvoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProInvoiceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
