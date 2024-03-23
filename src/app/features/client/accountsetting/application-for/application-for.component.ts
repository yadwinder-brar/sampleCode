import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-application-for',
  templateUrl: './application-for.component.html',
  styleUrls: ['./application-for.component.css'],
})
export class ApplicationForComponent implements OnInit {
  userDetail: any;
  form!: FormGroup;
  mask = '(000) 000-0000';
  minDate: any = new Date();

  constructor(
    public dialogRef: MatDialogRef<ApplicationForComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _toasterService: ToasterService,
    private _authService: AuthService,
    private datePipe: DatePipe
  ) {
    this.minDate = this.datePipe.transform(this.minDate, 'MM-dd-YYYY');
    if (data?.data) {
      this.userDetail = data?.data;
      console.log(this.userDetail);
      this.form = this._fb.group({
        contractDate: [this.minDate, [ValidatorsService.required]],
        name: [this.userDetail?.name, [ValidatorsService.required]],
        signature: [
          this.userDetail?.signature,
          [ValidatorsService.required],
        ],
        signature1: [
          this.userDetail?.signature1,
          [ValidatorsService.required],
        ],
        initial: [
          this.userDetail?.initial,
          ValidatorsService.required,
        ],
        mailboxType: ['personal', ValidatorsService.required],
        companyName: [this.userDetail?.companyName, []],
        address1: [
          this.userDetail?.address1,
          [ValidatorsService.required],
        ],
        address2: [this.userDetail?.address2, []],
        city: [this.userDetail?.city, [ValidatorsService.required]],
        state: [
          this.userDetail?.state,
          [ValidatorsService.selectRequired],
        ],
        email: [this.userDetail?.email, [ValidatorsService.selectRequired]],
        zipCode: [
          this.userDetail?.zipCode,
          [
            ValidatorsService.required,
            ValidatorsService.specailCharacter,
            ValidatorsService.maxZip,
          ],
        ],
        phone: [
          this.userDetail?.phone,
          [ValidatorsService.required, ValidatorsService.phoneNumberValidator],
        ],
      },
      { validators: [ValidatorsService.compareSignatureValidator('signature', 'signature1')]});
    } else {
      this.userDetail = this._authService.getUserProfile();
      this.form = this._fb.group({
        contractDate: [this.minDate, [ValidatorsService.required]],
        name: [this.userDetail?.profiles[0]?.name, [ValidatorsService.required]],
        signature: [
          this.userDetail?.profiles[0]?.signature,
          [ValidatorsService.required],
        ],
        signature1: [
          this.userDetail?.profiles[0]?.signature1,
          [ValidatorsService.required],
        ],
        initial: [
          this.userDetail?.profiles[0]?.initial,
          ValidatorsService.required,
        ],
        mailboxType: ['personal', ValidatorsService.required],
        companyName: [this.userDetail?.profiles[0]?.companyName, []],
        address1: [
          this.userDetail?.profiles[0]?.address1,
          [ValidatorsService.required],
        ],
        address2: [this.userDetail?.profiles[0]?.address2, []],
        city: [this.userDetail?.profiles[0]?.city, [ValidatorsService.required]],
        state: [
          this.userDetail?.profiles[0]?.state,
          [ValidatorsService.selectRequired],
        ],
        email: [this.userDetail?.email, [ValidatorsService.selectRequired]],
        zipCode: [
          this.userDetail?.profiles[0]?.zipCode,
          [
            ValidatorsService.required,
            ValidatorsService.specailCharacter,
            ValidatorsService.maxZip,
          ],
        ],
        phone: [
          this.userDetail?.profiles[0]?.phone,
          [ValidatorsService.required, ValidatorsService.phoneNumberValidator],
        ],
      },
      { validators: [ValidatorsService.compareSignatureValidator('signature', 'signature1')]});
    }
  }

  error(control: any, name: any) {
    return ValidatorsService.error(control?.errors, name);
  }
  
  ngOnInit(): void {
    this.userDetail?.postOfficeForm;
    this.createForm();
  }
  createForm() {
  
  }

  formData() {
    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      this._toasterService.errorToast('Please fill in the form');
      return;
    }
    if (this.form.valid) {
      this._authService.storeApplicationFrom(this.form?.value);
      this._toasterService.successToast('Add form successfully');
      this.dialogRef.close(this.form.value);
    }
  }
}
