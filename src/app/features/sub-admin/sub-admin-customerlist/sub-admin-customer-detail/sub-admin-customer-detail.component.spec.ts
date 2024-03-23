import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminCustomerDetailComponent } from './sub-admin-customer-detail.component';

describe('SubAdminCustomerDetailComponent', () => {
  let component: SubAdminCustomerDetailComponent;
  let fixture: ComponentFixture<SubAdminCustomerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminCustomerDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
