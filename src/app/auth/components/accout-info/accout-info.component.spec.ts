import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutInfoComponent } from './accout-info.component';

describe('AccoutInfoComponent', () => {
  let component: AccoutInfoComponent;
  let fixture: ComponentFixture<AccoutInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccoutInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccoutInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
