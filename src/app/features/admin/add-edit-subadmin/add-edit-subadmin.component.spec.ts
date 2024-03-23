import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSUbadminComponent } from './add-edit-subadmin.component';

describe('AddEditSUbadminComponent', () => {
  let component: AddEditSUbadminComponent;
  let fixture: ComponentFixture<AddEditSUbadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSUbadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSUbadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
