import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmarginComponent } from './editmargin.component';

describe('EditmarginComponent', () => {
  let component: EditmarginComponent;
  let fixture: ComponentFixture<EditmarginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmarginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditmarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
