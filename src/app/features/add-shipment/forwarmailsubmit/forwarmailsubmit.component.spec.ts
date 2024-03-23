import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwarmailsubmitComponent } from './forwarmailsubmit.component';

describe('ForwarmailsubmitComponent', () => {
  let component: ForwarmailsubmitComponent;
  let fixture: ComponentFixture<ForwarmailsubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwarmailsubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwarmailsubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
