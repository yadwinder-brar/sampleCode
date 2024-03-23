import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MargindiscountComponent } from './margindiscount.component';

describe('MargindiscountComponent', () => {
  let component: MargindiscountComponent;
  let fixture: ComponentFixture<MargindiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MargindiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MargindiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
