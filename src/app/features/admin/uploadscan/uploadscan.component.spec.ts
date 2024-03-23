import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadscanComponent } from './uploadscan.component';

describe('UploadscanComponent', () => {
  let component: UploadscanComponent;
  let fixture: ComponentFixture<UploadscanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadscanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
