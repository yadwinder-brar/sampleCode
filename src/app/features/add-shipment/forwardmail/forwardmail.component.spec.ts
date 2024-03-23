import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardmailComponent } from './forwardmail.component';

describe('ForwardmailComponent', () => {
  let component: ForwardmailComponent;
  let fixture: ComponentFixture<ForwardmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwardmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
