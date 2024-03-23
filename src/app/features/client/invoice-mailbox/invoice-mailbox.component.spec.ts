import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceMailboxComponent } from './invoice-mailbox.component';

describe('InvoiceMailboxComponent', () => {
  let component: InvoiceMailboxComponent;
  let fixture: ComponentFixture<InvoiceMailboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceMailboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceMailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
