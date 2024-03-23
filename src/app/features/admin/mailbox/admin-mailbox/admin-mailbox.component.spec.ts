import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMailboxComponent } from './admin-mailbox.component';

describe('AdminMailboxComponent', () => {
  let component: AdminMailboxComponent;
  let fixture: ComponentFixture<AdminMailboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMailboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
