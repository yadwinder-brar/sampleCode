import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminMailboxRequestListComponent } from './subadmin-mailbox-request-list.component';

describe('SubadminMailboxRequestListComponent', () => {
  let component: SubadminMailboxRequestListComponent;
  let fixture: ComponentFixture<SubadminMailboxRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminMailboxRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubadminMailboxRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
