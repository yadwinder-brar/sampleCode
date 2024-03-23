import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewpackageComponent } from './addnewpackage.component';

describe('AddnewpackageComponent', () => {
  let component: AddnewpackageComponent;
  let fixture: ComponentFixture<AddnewpackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewpackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
