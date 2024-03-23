import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-post-office-form-detail',
  templateUrl: './post-office-form-detail.component.html',
  styleUrls: ['./post-office-form-detail.component.css']
})
export class PostOfficeFormDetailComponent implements OnInit {
  userDetail:any
  form!: FormGroup;
  mask = '(000) 000-0000';
  constructor(
    public dialogRef: MatDialogRef<PostOfficeFormDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
  ) { 
    this.userDetail = this.data?.userData;
  }

  ngOnInit(): void {
    this.userDetail?.postOfficeForm
    this.createForm();
  }
  createForm(){
    this.form = this._fb.group({
      contractDate: [this.userDetail?.postOfficeForm?.contractDate, [ValidatorsService.required]],
      name: [this.userDetail?.postOfficeForm?.name, [ValidatorsService.required,]],
      signature: [this.userDetail?.postOfficeForm?.signature, [ValidatorsService.required,]],
      initial:[this.userDetail?.postOfficeForm?.initial,ValidatorsService.required,],
      mailboxType:[this.userDetail?.postOfficeForm?.mailboxType,ValidatorsService.required,],
      
      
      companyName: [this.userDetail?.postOfficeForm?.companyName , []],
      address1: [this.userDetail?.postOfficeForm?.address1, [ValidatorsService.required]],
      address2: [this.userDetail?.postOfficeForm?.address2 , []],
      city: [this.userDetail?.postOfficeForm?.city , [ValidatorsService.required]],
      state: [this.userDetail?.postOfficeForm?.state , [ValidatorsService.selectRequired]],
      email: [this.userDetail?.postOfficeForm?.email , [ValidatorsService.selectRequired]],
      zipCode: [this.userDetail?.postOfficeForm?.zipCode , [ValidatorsService.required, ValidatorsService.specailCharacter, ValidatorsService.maxZip]],
      phone: [this.userDetail?.postOfficeForm?.phone , [ValidatorsService.required, ValidatorsService.phoneNumberValidator]],
    })
  }

}
