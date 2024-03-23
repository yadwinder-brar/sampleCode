import { Component, OnInit, Inject } from "@angular/core";
import { FileUploader, FileItem } from "ng2-file-upload";
import { environment } from "src/environments/environment";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToasterService } from "src/app/core/services";

@Component({
  selector: "app-file-uploader",
  template: `
    <div class="after-upload" *ngFor="let item of uploader?.queue">
      <div class="progress-row">
        <div class="file-name">
          {{ item?.file?.name }}
        </div>
        <div class="upload-progress">
          <mat-progress-bar
            mode="determinate"
            [value]="item?.progress"
          ></mat-progress-bar>
        </div>
        <div class="percentage">{{ item?.progress }}%</div>
      </div>
    
    </div>
  `,
  styles: [
    `
      ::ng-deep .file-uploader-dialog .mat-dialog-container {
        padding: 0px !important;
      }
      .after-upload {
        align-items: center;
        text-align: left;
        padding: 10px;
        font-size: 12px;
        width:100%;
        border-bottom: 1px solid #e5e3e3;
      }
       
        .progress-row {
          flex: 1;
        }
        .close {
          padding: 10px;
          cursor: pointer;
        }
      img {
          padding: 0px 10px;
        }
    `,
  ],
})
export class FileUploaderComponent implements OnInit {
  uploader: FileUploader;
  outputUrls: string[] = [];
  files: File[] = [];

  constructor(
    private _dialogRef: MatDialogRef<FileUploaderComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { files: File[]; successMessage: string; path?: any },
    private _appService: ToasterService
  ) {
    this.files = data.files;
    this.uploader = new FileUploader({
      url: `${environment.apiUrls.api}${this.data?.path ? this.data?.path : "images/upload"
        }`,
      removeAfterUpload: false,
      itemAlias: "media",
      autoUpload: true,
      headers: [
        { name: "x-access-token", value: localStorage.getItem("x-access-token") || "" },
      ],
    });

    this.uploader.onAfterAddingFile = (item) => {
      item.withCredentials = false;
    };

    this.uploader.onSuccessItem = this.onSuccessItem;
    this.uploader.onErrorItem = this.onErrorItem;
    this.uploader.onCompleteAll = this.onCompleteAll;
    this.uploader.addToQueue(this.files);
  }

  response?: any;
  onSuccessItem = (
    item: FileItem,
    responce: string,
    status: number,
    header: any
  ) => {
    const res: Responce = JSON.parse(responce);
    this.response = res;
    if (res.isSuccess) {
      this.outputUrls.push(res?.data?.url || "");
      this._appService.successToast(
        this.data?.successMessage || "File uploaded successfully"
      );
    } else {
      this._appService.errorToast(
        res.error || res.message || "File upload failed"
      );
      this.outputUrls.push("");
    }
  };

  onErrorItem = (
    item: FileItem,
    responce: string,
    status: number,
    header: any
  ) => {
    const res: Responce = JSON.parse(responce);
    if (!res.isSuccess) {
      this._appService.errorToast(
        res.error || res.message || "File upload failed"
      );
    } else {
      this._appService.errorToast("Image upload Failed");
    }
    this.outputUrls.push("");
  };

  onCompleteAll = () => {
    this.uploader.clearQueue();
    this._dialogRef.close(this.data?.path ? this.response : this.outputUrls);
  };

  cancelItem(item: FileItem) {
    if (item.isUploaded) {
      // @ts-ignore
      this.outputUrls.splice(item.index, 1);
    }
    item.cancel();
    item.remove();
    if (!this.uploader.queue.length) {
      this._dialogRef.close([]);
    }
  }

  ngOnInit() { }
}

class Responce {
  isSuccess?: boolean;
  data?: { url?: string };
  error?: string;
  message?: string;
}
