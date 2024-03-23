import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-invitecustomer',
  templateUrl: './invitecustomer.component.html',
  styleUrls: ['./invitecustomer.component.css']
})
export class InvitecustomerComponent implements OnInit {
  userEmail: any;

  email = new FormControl('', [ValidatorsService.emailValidator, ValidatorsService.required]);
  constructor(
    public dialogRef: MatDialogRef<InvitecustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _apiService: ApiService
  ) { }
  ngOnInit() {
  }

  sendEmail() {
    if (this.email.valid) {
      let data = {
        email: this.email.value
      }
      this._apiService.inviteCustomer(data).subscribe(res => {
        if (res?.isSuccess) {
          this.dialogRef.close(true);
        }else{
          
        }
      })
    }
  }
}
