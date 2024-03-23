import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsreportsComponent } from './analyticsreports.component';

describe('AnalyticsreportsComponent', () => {
  let component: AnalyticsreportsComponent;
  let fixture: ComponentFixture<AnalyticsreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsreportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
