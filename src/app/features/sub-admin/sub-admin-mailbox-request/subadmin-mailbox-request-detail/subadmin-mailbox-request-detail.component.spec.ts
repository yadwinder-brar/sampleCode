import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminMailboxRequestDetailComponent } from './subadmin-mailbox-request-detail.component';

describe('SubadminMailboxRequestDetailComponent', () => {
  let component: SubadminMailboxRequestDetailComponent;
  let fixture: ComponentFixture<SubadminMailboxRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminMailboxRequestDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubadminMailboxRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
