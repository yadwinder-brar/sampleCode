import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentRequestComponent } from './shipment-request.component';

describe('ShipmentRequestComponent', () => {
  let component: ShipmentRequestComponent;
  let fixture: ComponentFixture<ShipmentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
