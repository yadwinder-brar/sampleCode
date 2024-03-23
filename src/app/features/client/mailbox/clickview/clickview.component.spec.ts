import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickviewComponent } from './clickview.component';

describe('ClickviewComponent', () => {
  let component: ClickviewComponent;
  let fixture: ComponentFixture<ClickviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
