import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShipmentDetailComponent } from './view-shipment-detail.component';

describe('ViewShipmentDetailComponent', () => {
  let component: ViewShipmentDetailComponent;
  let fixture: ComponentFixture<ViewShipmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewShipmentDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewShipmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
