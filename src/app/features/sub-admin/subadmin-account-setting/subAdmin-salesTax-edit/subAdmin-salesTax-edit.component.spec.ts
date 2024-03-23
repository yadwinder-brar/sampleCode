/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubAdminSalesTaxEditComponent } from './subAdmin-salesTax-edit.component';

describe('SubAdminSalesTaxEditComponent', () => {
  let component: SubAdminSalesTaxEditComponent;
  let fixture: ComponentFixture<SubAdminSalesTaxEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAdminSalesTaxEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdminSalesTaxEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
