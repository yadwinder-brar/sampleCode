import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationProffMailboxComponent } from './application-proff-mailbox.component';

describe('ApplicationProffMailboxComponent', () => {
  let component: ApplicationProffMailboxComponent;
  let fixture: ComponentFixture<ApplicationProffMailboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationProffMailboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationProffMailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
