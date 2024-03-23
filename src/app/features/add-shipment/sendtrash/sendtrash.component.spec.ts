import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendtrashComponent } from './sendtrash.component';

describe('SendtrashComponent', () => {
  let component: SendtrashComponent;
  let fixture: ComponentFixture<SendtrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendtrashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendtrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
