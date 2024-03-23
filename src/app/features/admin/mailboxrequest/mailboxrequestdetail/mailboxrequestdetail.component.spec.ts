import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxrequestdetailComponent } from './mailboxrequestdetail.component';

describe('MailboxrequestdetailComponent', () => {
  let component: MailboxrequestdetailComponent;
  let fixture: ComponentFixture<MailboxrequestdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailboxrequestdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailboxrequestdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
