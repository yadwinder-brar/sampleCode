import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminDetailComponent } from './sub-admin-detail.component';

describe('SubAdminDetailComponent', () => {
  let component: SubAdminDetailComponent;
  let fixture: ComponentFixture<SubAdminDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
