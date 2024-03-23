import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMailboxRequestComponent } from './admin-mailbox-request.component';

describe('AdminMailboxRequestComponent', () => {
  let component: AdminMailboxRequestComponent;
  let fixture: ComponentFixture<AdminMailboxRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMailboxRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMailboxRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
