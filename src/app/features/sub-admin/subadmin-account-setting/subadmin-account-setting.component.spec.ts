import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminAccountSettingComponent } from './subadmin-account-setting.component';

describe('SubadminAccountSettingComponent', () => {
  let component: SubadminAccountSettingComponent;
  let fixture: ComponentFixture<SubadminAccountSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminAccountSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubadminAccountSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
