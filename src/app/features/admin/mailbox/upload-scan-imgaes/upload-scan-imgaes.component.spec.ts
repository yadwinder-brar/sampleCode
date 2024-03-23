import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadScanImgaesComponent } from './upload-scan-imgaes.component';

describe('UploadScanImgaesComponent', () => {
  let component: UploadScanImgaesComponent;
  let fixture: ComponentFixture<UploadScanImgaesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadScanImgaesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadScanImgaesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
