import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY, catchError, take } from 'rxjs';
import { ApiService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-add-mailbox-count',
  templateUrl: './add-mailbox-count.component.html',
  styleUrls: ['./add-mailbox-count.component.css']
})
export class AddMailboxCountComponent implements OnInit {
  isLoading:boolean=false;
  scanCount = new FormControl('', [ValidatorsService.required]);
  constructor(
    public dialogRef: MatDialogRef<AddMailboxCountComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private _apiServices: ApiService,
    private _toasterService: ToasterService,
  ) { }

  ngOnInit(): void {

  }
  submit(){
    if (this.scanCount.value) {
     let body =  {
        scanCount:+this.scanCount.value,
        labelId:this.dialogData?.data?.id,
        userId:this.dialogData?.data?.profileId?.user?.id
    }
    this._apiServices.assignMailboxScanCount(body).pipe(
      catchError((error) => {
        error?this.isLoading = false:''
        this._toasterService.errorToast(error?.message);
        return EMPTY;
      }),take(1)
    ).subscribe(res => {
      if (res?.isSuccess) {
        this._toasterService.successToast('Scan added successfully');
        this.dialogRef.close(true);
      }else {
        this.isLoading = false;
      }
    })
    } else {
      alert('please enter scan count')
    }
  }
}
