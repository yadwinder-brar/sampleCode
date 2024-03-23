import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardmailfirstComponent } from './forwardmailfirst.component';

describe('ForwardmailfirstComponent', () => {
  let component: ForwardmailfirstComponent;
  let fixture: ComponentFixture<ForwardmailfirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwardmailfirstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardmailfirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
