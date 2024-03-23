import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgBorderComponent } from './img-border.component';

describe('ImgBorderComponent', () => {
  let component: ImgBorderComponent;
  let fixture: ComponentFixture<ImgBorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgBorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
