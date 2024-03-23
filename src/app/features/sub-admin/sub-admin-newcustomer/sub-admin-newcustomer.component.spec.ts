import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminNewcustomerComponent } from './sub-admin-newcustomer.component';

describe('SubAdminNewcustomerComponent', () => {
  let component: SubAdminNewcustomerComponent;
  let fixture: ComponentFixture<SubAdminNewcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminNewcustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminNewcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
