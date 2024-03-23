import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecardComponent } from './deletecard.component';

describe('DeletecardComponent', () => {
  let component: DeletecardComponent;
  let fixture: ComponentFixture<DeletecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletecardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
