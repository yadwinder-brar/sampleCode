import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackegeInfoComponent } from './packege-info.component';

describe('PackegeInfoComponent', () => {
  let component: PackegeInfoComponent;
  let fixture: ComponentFixture<PackegeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackegeInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackegeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
