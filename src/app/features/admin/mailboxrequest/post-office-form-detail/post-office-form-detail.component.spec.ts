import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOfficeFormDetailComponent } from './post-office-form-detail.component';

describe('PostOfficeFormDetailComponent', () => {
  let component: PostOfficeFormDetailComponent;
  let fixture: ComponentFixture<PostOfficeFormDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostOfficeFormDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostOfficeFormDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
