import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminInvoicesComponent } from './subadmin-invoices.component';

describe('SubadminInvoicesComponent', () => {
  let component: SubadminInvoicesComponent;
  let fixture: ComponentFixture<SubadminInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminInvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubadminInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
