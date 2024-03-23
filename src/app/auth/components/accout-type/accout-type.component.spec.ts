import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutTypeComponent } from './accout-type.component';

describe('AccoutTypeComponent', () => {
  let component: AccoutTypeComponent;
  let fixture: ComponentFixture<AccoutTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccoutTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccoutTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
