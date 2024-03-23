import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mailboxdetails2Component } from './mailboxdetails2.component';

describe('Mailboxdetails2Component', () => {
  let component: Mailboxdetails2Component;
  let fixture: ComponentFixture<Mailboxdetails2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Mailboxdetails2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mailboxdetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
