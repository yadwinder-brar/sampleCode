import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminInvoicesComponent } from './sub-admin-invoices.component';

describe('SubAdminInvoicesComponent', () => {
  let component: SubAdminInvoicesComponent;
  let fixture: ComponentFixture<SubAdminInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminInvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
