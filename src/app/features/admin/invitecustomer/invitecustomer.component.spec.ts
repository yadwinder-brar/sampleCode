import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitecustomerComponent } from './invitecustomer.component';

describe('InvitecustomerComponent', () => {
  let component: InvitecustomerComponent;
  let fixture: ComponentFixture<InvitecustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitecustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitecustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
