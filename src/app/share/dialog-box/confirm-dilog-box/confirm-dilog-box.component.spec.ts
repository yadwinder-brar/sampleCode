import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDilogBoxComponent } from './confirm-dilog-box.component';

describe('ConfirmDilogBoxComponent', () => {
  let component: ConfirmDilogBoxComponent;
  let fixture: ComponentFixture<ConfirmDilogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDilogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDilogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
