import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileUploaderComponent } from '../../components/file-uploader/file-uploader.component';

@Directive({
  selector: 'file-uploader,[FileUploader]',
  exportAs: 'FileUploader'
})
export class FileUploaderDirective {

  @Output() onUploadFile: EventEmitter<string[]> = new EventEmitter();
  @Input() successMessage: string = '';
  @Input() path: string = '';

  constructor(
    private _matDialog: MatDialog,
    
  ) { }

  uploadFile(files: File[] = []) {
    return new Promise<string[]>((res, rej) => {
      this._matDialog.open(FileUploaderComponent, {
        data: { files, successMessage: this.successMessage, path: this.path },
        disableClose: true,
        panelClass: 'file-uploader-dialog',
        minWidth: '400px',
        maxWidth: '100%',
        maxHeight: '100%'
      }).afterClosed().subscribe((urls: any) => {
        if (urls?.data?.id) {
          this.onUploadFile.emit(urls?.data);
          res(urls.data);
          return
        }
        if (urls?.length || urls?.isSuccess) {
          res(urls);
          this.onUploadFile.emit(urls);
        } else {
          rej(null);
        };
      })
    })

  }

}
