import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminCustomerComponent } from './sub-admin-customer.component';

describe('SubAdminCustomerComponent', () => {
  let component: SubAdminCustomerComponent;
  let fixture: ComponentFixture<SubAdminCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
