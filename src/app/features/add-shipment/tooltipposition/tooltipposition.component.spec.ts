import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltippositionComponent } from './tooltipposition.component';

describe('TooltippositionComponent', () => {
  let component: TooltippositionComponent;
  let fixture: ComponentFixture<TooltippositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TooltippositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TooltippositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
