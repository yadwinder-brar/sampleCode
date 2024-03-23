import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOfficeMailboxComponent } from './post-office-mailbox.component';

describe('PostOfficeMailboxComponent', () => {
  let component: PostOfficeMailboxComponent;
  let fixture: ComponentFixture<PostOfficeMailboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostOfficeMailboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostOfficeMailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
