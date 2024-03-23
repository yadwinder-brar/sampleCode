import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectcardComponent } from './selectcard.component';

describe('SelectcardComponent', () => {
  let component: SelectcardComponent;
  let fixture: ComponentFixture<SelectcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
