import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDetailUpdateComponent } from './bank-detail-update.component';

describe('BankDetailUpdateComponent', () => {
  let component: BankDetailUpdateComponent;
  let fixture: ComponentFixture<BankDetailUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankDetailUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankDetailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
