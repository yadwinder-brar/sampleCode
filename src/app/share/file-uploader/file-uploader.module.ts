import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { ImageCropperDirective } from './directives/image-cropper/image-cropper.directive';
import { FileUploaderDirective } from './directives/file-uploader/file-uploader.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UploadFileComponent } from '../upload-file/upload-file.component';

const components = [
  ImageCropperComponent,
  FileUploaderComponent,
  UploadFileComponent
]

const directives = [
  ImageCropperDirective,
  FileUploaderDirective
]

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    FileUploadModule,
    ImageCropperModule,

  ],
  declarations: [
    components,
    directives
  ],
  exports: [
    components,
    directives
  ],
  entryComponents: [
    components
  ]
})
export class FileUploaderModule { }
