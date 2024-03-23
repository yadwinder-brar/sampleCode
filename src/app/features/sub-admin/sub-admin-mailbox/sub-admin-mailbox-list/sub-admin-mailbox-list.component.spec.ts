import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminMailboxListComponent } from './sub-admin-mailbox-list.component';

describe('SubAdminMailboxListComponent', () => {
  let component: SubAdminMailboxListComponent;
  let fixture: ComponentFixture<SubAdminMailboxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminMailboxListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminMailboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
