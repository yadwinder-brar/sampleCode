import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminInvoiceDialogComponent } from './sub-admin-invoice-dialog.component';

describe('SubAdminInvoiceDialogComponent', () => {
  let component: SubAdminInvoiceDialogComponent;
  let fixture: ComponentFixture<SubAdminInvoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminInvoiceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
