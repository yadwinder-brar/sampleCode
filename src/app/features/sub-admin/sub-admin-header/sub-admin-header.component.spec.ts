import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminHeaderComponent } from './sub-admin-header.component';

describe('SubAdminHeaderComponent', () => {
  let component: SubAdminHeaderComponent;
  let fixture: ComponentFixture<SubAdminHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
