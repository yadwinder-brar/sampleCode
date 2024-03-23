import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminEditProfileComponent } from './sub-admin-edit-profile.component';

describe('SubAdminEditProfileComponent', () => {
  let component: SubAdminEditProfileComponent;
  let fixture: ComponentFixture<SubAdminEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminEditProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
