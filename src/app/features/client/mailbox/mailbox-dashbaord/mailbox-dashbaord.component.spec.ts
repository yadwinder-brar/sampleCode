import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxDashbaordComponent } from './mailbox-dashbaord.component';

describe('DashbaordComponent', () => {
  let component: MailboxDashbaordComponent;
  let fixture: ComponentFixture<MailboxDashbaordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailboxDashbaordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailboxDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
