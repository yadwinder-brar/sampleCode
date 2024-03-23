import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVipDiscountComponent } from './edit-vip-discount.component';

describe('EditVipDiscountComponent', () => {
  let component: EditVipDiscountComponent;
  let fixture: ComponentFixture<EditVipDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVipDiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVipDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
