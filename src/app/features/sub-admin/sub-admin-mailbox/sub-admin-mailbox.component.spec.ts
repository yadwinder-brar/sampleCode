import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminMailboxComponent } from './sub-admin-mailbox.component';

describe('SubAdminMailboxComponent', () => {
  let component: SubAdminMailboxComponent;
  let fixture: ComponentFixture<SubAdminMailboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminMailboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminMailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
