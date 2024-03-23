import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxdetailComponent } from './mailboxdetail.component';

describe('MailboxdetailComponent', () => {
  let component: MailboxdetailComponent;
  let fixture: ComponentFixture<MailboxdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailboxdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailboxdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
