import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmailboxComponent } from './assignmailbox.component';

describe('AssignmailboxComponent', () => {
  let component: AssignmailboxComponent;
  let fixture: ComponentFixture<AssignmailboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmailboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
