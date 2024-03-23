import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShipmentsComponent } from './admin-shipments.component';

describe('AdminShipmentsComponent', () => {
  let component: AdminShipmentsComponent;
  let fixture: ComponentFixture<AdminShipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShipmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
