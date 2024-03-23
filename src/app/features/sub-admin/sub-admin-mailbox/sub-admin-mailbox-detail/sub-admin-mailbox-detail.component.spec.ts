import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminMailboxDetailComponent } from './sub-admin-mailbox-detail.component';

describe('SubAdminMailboxDetailComponent', () => {
  let component: SubAdminMailboxDetailComponent;
  let fixture: ComponentFixture<SubAdminMailboxDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminMailboxDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminMailboxDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
