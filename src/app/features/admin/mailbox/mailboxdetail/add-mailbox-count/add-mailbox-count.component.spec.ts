import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMailboxCountComponent } from './add-mailbox-count.component';

describe('AddMailboxCountComponent', () => {
  let component: AddMailboxCountComponent;
  let fixture: ComponentFixture<AddMailboxCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMailboxCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMailboxCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
