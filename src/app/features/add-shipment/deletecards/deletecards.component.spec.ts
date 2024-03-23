import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecardsComponent } from './deletecards.component';

describe('DeletecardsComponent', () => {
  let component: DeletecardsComponent;
  let fixture: ComponentFixture<DeletecardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletecardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletecardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
