import { Component, OnInit, Inject } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CropperFileOption } from '../../file-uploader.constants';
import { ToasterService } from 'src/app/core/services/toaster.service';

// import { ToasterService } from './../services/toaster.service';

@Component({
  selector: 'app-image-cropper',
  template: `
    <div class="outerCrop">
      <header>
        <div class="font-20 fw-700 ml-2">{{!data?.notCrop ? 'Crop Image' :'View Image'}}</div>
      </header>
      <div class="mt-3">
        <image-cropper 
          *ngIf="!data?.notCrop" 
          [roundCropper]="data?.roundCropper || false"
          [imageFile]="data.file"
          [maintainAspectRatio]="true"
          [aspectRatio]="6/4"
          format="png"
          (imageCropped)="imageCropped($event)"
          (imageLoaded)="imageLoaded()"
          (cropperReady)="cropperReady()"
          (loadImageFailed)="loadImageFailed()">
        </image-cropper>
      </div>

      <footer class="d-flex justify-content-center text-center mt-3 mx-auto">
      <div class="theme-btn white-btn" (click)="dialogRef.close()">Cancel</div>
        <button class="btn btn-add ml-2 theme-btn red theme-color " (click)="!data?.notCrop ? done() : select()">
         Done
        </button>
      </footer>
</div>
  `,
  styles: [`
      h3 {
          font-size: 16px;
      }
      image-cropper{
          height: 70vh;
      }
      .fw-700{
        font-weight:700;
      }
     .justify-content-center {
    justify-content: center;
}
.theme-btn {
    outline: none;
    border: none;
    font-family: "Poppins", sans-serif;
    border-radius: 40px;
    width: 140px;
    height: 39px;
    cursor: pointer;
    padding:8px;
}
.theme-btn.white-btn {
    background-color: white;
    box-shadow: 0px 0px 6px rgb(0 0 0 / 16%);
    color: black;
    font-family: "Poppins", sans-serif;
    font-size: 14px;
}
.theme-btn.red {
    background: transparent linear-gradient(270deg, #d0333a 0%, #dc5e63 100%) 0% 0% no-repeat padding-box;
    color: #fff;
    box-shadow: 0px 8px 10px rgb(208 51 58 / 20%);
    font-size: 14px;
}
      .ml-auto, .mx-auto {
    margin-left: auto !important;
}
      .mr-auto, .mx-auto {
    margin-right: auto !important;
}
      /* .black{
        color:#000;
      } */
      header {
  background-color: #D0333A !important;
  color: #fff !important;
  padding: 1.3rem;
}
  `]
})
export class ImageCropperComponent implements OnInit {

  private _croppedFile?: ImageCroppedEvent;
  _file: File;
  selectedFile?: File;
  isloading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ImageCropperComponent>,
    private _appService: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: CropperFileOption
  ) {

    let file = data.file;
    this._file = data.file;

    if (file && !file.type.includes('image')) {
      this._appService.errorToast(`Only image file is supported`);
      dialogRef.close();
      return;
    }
    this.selectedFile = data.file;
  }

  ngOnInit() {
  }

  imageCropped(event: ImageCroppedEvent) {
    this._croppedFile = event;
  }
  imageLoaded() {
    this.isloading = false;
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    this._appService.errorToast('Something went wrong with this image');
  }

  done() {
    if (this._croppedFile?.base64) {
      var bolbBin = atob(this._croppedFile.base64.split(',')[1]);
      var ary = [];
      for (let i = 0; i < bolbBin.length; i++) {
        ary.push(bolbBin.charCodeAt(i));
      }
      let bb = new Blob([new Uint8Array(ary)], { type: "image/png" });
      let file = new File([bb], this._file.name || 'Select Image', { type: 'image/png' });
      this.dialogRef.close(file);
    }
  }

  select() {
    this.dialogRef.close(this._file);
  }



}