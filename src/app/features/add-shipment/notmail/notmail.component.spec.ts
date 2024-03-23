import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotmailComponent } from './notmail.component';

describe('NotmailComponent', () => {
  let component: NotmailComponent;
  let fixture: ComponentFixture<NotmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
