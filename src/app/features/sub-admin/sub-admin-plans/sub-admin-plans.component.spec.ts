import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminPlansComponent } from './sub-admin-plans.component';

describe('SubAdminPlansComponent', () => {
  let component: SubAdminPlansComponent;
  let fixture: ComponentFixture<SubAdminPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminPlansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
