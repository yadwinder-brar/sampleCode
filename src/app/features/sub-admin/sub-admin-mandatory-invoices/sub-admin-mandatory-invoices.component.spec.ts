import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminMandatoryInvoicesComponent } from './sub-admin-mandatory-invoices.component';

describe('SubAdminMandatoryInvoicesComponent', () => {
  let component: SubAdminMandatoryInvoicesComponent;
  let fixture: ComponentFixture<SubAdminMandatoryInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminMandatoryInvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminMandatoryInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
