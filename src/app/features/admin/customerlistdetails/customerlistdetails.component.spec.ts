import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerlistdetailsComponent } from './customerlistdetails.component';

describe('CustomerlistdetailsComponent', () => {
  let component: CustomerlistdetailsComponent;
  let fixture: ComponentFixture<CustomerlistdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerlistdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerlistdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
