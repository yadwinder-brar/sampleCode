

import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUploaderDirective } from '../file-uploader/directives/file-uploader/file-uploader.directive';
import { ImageCropperDirective } from '../file-uploader/directives/image-cropper/image-cropper.directive';
import { CropperOption } from '../file-uploader/file-uploader.constants';

@Component({
  selector: 'app-uploader-ui',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true,
    },
  ],
})

export class UploadFileComponent implements ControlValueAccessor {
  @Input() cropper?: ImageCropperDirective;
  @Input() cropperOptions: CropperOption = { ratio: 1 };
  @Input() fileUploader?: FileUploaderDirective;
  @Input() selectFileType?: any = '';
  @Output() afterSelectFile: EventEmitter<File> = new EventEmitter();
  @Output() afterCropFile: EventEmitter<File> = new EventEmitter();
  @Output() afterUploadFile: EventEmitter<string[]> = new EventEmitter();
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  constructor() { }

  selectFile() {
    this.fileInput?.nativeElement?.click();
  }

  onInputChange(ev: any, type: string) {
    console.log(ev);
    const files: File[] = ev.target.files || [];
    if (files.length) {
      this.onSelectFile(files[0]);
    }
  }

  getExtension(name: string, nameOnly: boolean) {
    let n = name.split('.');
    if (nameOnly && n?.length) {
      return n[0];
    } else {
      return n.pop();
    }
  }

  onSelectFile(file: File) {
    this.afterSelectFile.emit(file);
    if (this.cropper) {
      this.cropImage(file);
    } else if (this.fileUploader) {
      this.uploadFile([file]);
    }
  }

  async cropImage(file: File) {
    if (!this.cropper) return;
    try {
      const cropFile = await this.cropper?.cropImage(file, this.cropperOptions);
      this.afterCropFile.emit(cropFile);
      this.uploadFile([cropFile]);
    } catch (error) {
      console.log(error);
      console.log('Crop image cancelled.');
    }
  }

  async uploadFile(files: File[]) {
    if (!this.fileUploader) return;
    try {
      if (this.selectFileType) {
        let file = files[0]?.name.split('.').pop();
        if (file != this.selectFileType) {
          alert('Please upload excel file only');
          return
        }
      }

      const urls = await this.fileUploader?.uploadFile(files);
      if (!urls) return;
      if (this.value instanceof Array) {
        this.value = [...this.value, ...urls];
      } else {
        this.value = urls[0];
      }
      this.afterUploadFile.emit(urls);
    } catch (error) {
      console.log(error)
      console.log('upload image Cancelled.');
    }
  }

  onChange: any = () => { };
  onTouch: any = () => { };
  private _value: string[] | string = '';
  get value() {
    return this._value;
  }
  set value(v) {
    this._value = v;
    this.onChange(v);
    this.onTouch(v);
  }

  writeValue(value: any) {
    this.value = value;
  }
  // method to be triggered on UI change
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  // method to be triggered on component touch
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  fileType(url: any) {
    let file = url?.split('.').pop();
    switch (file) {
      case 'jpg':
        return 'image';
      case 'png':
        return 'image';
      case 'jpeg':
        return 'image';
      case 'gif':
        return 'image';
      case 'JPG':
        return 'image';
      case 'mp4':
        return 'video';
      case 'mov':
        return 'video';
      case 'wmv':
        return 'video';
      case 'flv':
        return 'video';
      case 'avi':
        return 'video';
      case 'mkv':
        return 'video';
      default:
        break;
    }
    return;
  }
}




