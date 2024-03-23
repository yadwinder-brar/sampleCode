import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOfficeMailbox2Component } from './post-office-mailbox2.component';

describe('PostOfficeMailbox2Component', () => {
  let component: PostOfficeMailbox2Component;
  let fixture: ComponentFixture<PostOfficeMailbox2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostOfficeMailbox2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostOfficeMailbox2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
