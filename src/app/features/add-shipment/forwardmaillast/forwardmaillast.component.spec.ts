import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardmaillastComponent } from './forwardmaillast.component';

describe('ForwardmaillastComponent', () => {
  let component: ForwardmaillastComponent;
  let fixture: ComponentFixture<ForwardmaillastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwardmaillastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardmaillastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
