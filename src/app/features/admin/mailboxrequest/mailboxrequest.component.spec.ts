import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxrequestComponent } from './mailboxrequest.component';

describe('MailboxrequestComponent', () => {
  let component: MailboxrequestComponent;
  let fixture: ComponentFixture<MailboxrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailboxrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailboxrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
