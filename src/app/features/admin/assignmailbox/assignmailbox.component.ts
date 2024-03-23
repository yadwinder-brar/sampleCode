import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-assignmailbox',
  templateUrl: './assignmailbox.component.html',
  styleUrls: ['./assignmailbox.component.css']
})
export class AssignmailboxComponent implements OnInit {
  vertualId = new FormControl('', [ValidatorsService.required]);
  assigne: any = '';
  isLoading:boolean=false;
  constructor(
    public dialogRef: MatDialogRef<AssignmailboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _apiServices: ApiService,
    private _router: Router,
  ) {
    this.assigne = this.data?.assigneType;
  }

  ngOnInit(): void {
  }

  approveRequest() {
    if (this.vertualId.value) {
      this.assigne ? this.reassignMailbox() : this.assignMailbox();
    } else {
      alert('please select mailbox address')
    }
  }

  assignMailbox() {
    this.isLoading=true
    let item = {
      status: "approved",
      virtualId: this.vertualId.value
    }

    this._apiServices.approveRejectMailBoxRequest(item, this.data?.id).subscribe(res => {
      if (res.isSuccess) {
        // this._router.navigate(['/admin/mailboxrequest']);
        this.dialogRef.close(true);
        this.isLoading=false;
      }
      else {
        this.isLoading=false;
      }
    })
  }

  reassignMailbox() {
    let item = {
      virtualId: this.vertualId.value,
      isAssigne: 'reassigne'
    }
    this._apiServices.reassignMailbox(item, this.data?.id).subscribe(res => {
      if (res.isSuccess) {
        this._router.navigate(['/admin/mailbox']);
        this.dialogRef.close(true);
      }
      else {
      }
    })
  }

}
