import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminMailboxFrowardDetailComponent } from './sub-admin-mailbox-froward-detail.component';

describe('SubAdminMailboxFrowardDetailComponent', () => {
  let component: SubAdminMailboxFrowardDetailComponent;
  let fixture: ComponentFixture<SubAdminMailboxFrowardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminMailboxFrowardDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminMailboxFrowardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
