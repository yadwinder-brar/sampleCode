import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverAddressComponent } from './receiver-address.component';

describe('ReceiverAddressComponent', () => {
  let component: ReceiverAddressComponent;
  let fixture: ComponentFixture<ReceiverAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiverAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiverAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
