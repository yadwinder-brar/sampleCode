import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewcarrierComponent } from './addnewcarrier.component';

describe('AddnewcarrierComponent', () => {
  let component: AddnewcarrierComponent;
  let fixture: ComponentFixture<AddnewcarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewcarrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewcarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
