import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminMailboxRequestComponent } from './sub-admin-mailbox-request.component';

describe('SubAdminMailboxRequestComponent', () => {
  let component: SubAdminMailboxRequestComponent;
  let fixture: ComponentFixture<SubAdminMailboxRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminMailboxRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminMailboxRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
