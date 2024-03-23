import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminCustomerlistComponent } from './sub-admin-customerlist.component';

describe('SubAdminCustomerlistComponent', () => {
  let component: SubAdminCustomerlistComponent;
  let fixture: ComponentFixture<SubAdminCustomerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminCustomerlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminCustomerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
