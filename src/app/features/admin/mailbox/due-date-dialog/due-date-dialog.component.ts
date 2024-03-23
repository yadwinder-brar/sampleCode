import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-due-date-dialog',
  templateUrl: './due-date-dialog.component.html',
  styleUrls: ['./due-date-dialog.component.css']
})
export class DueDateDialogComponent implements OnInit {
  isLoading:boolean = false;
dueDate= new FormControl('', [ValidatorsService.required]);
  constructor(
    public dialogRef:MatDialogRef<DueDateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _apiService: ApiService,
    private _toasterService: ToasterService,
  ) { }

  ngOnInit(): void {
  }
  changeDueDate(){
    if (this.dueDate.valid) {
      this.isLoading = true
      let item = {
        endDate: this.dueDate.value
      }
      let id= this.data?.data?.user?.userPlan?.id 
      this._apiService.changeDueDate(id,item).subscribe(res => {
        if (res?.isSuccess) {
          this.dialogRef.close(true);
          this._toasterService.successToast('Due date updated successfully')
        }else{
          this.isLoading = false
        }
      })
    }
  }
}
