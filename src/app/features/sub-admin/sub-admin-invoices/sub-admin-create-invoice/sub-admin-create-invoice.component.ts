import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY, catchError, take } from 'rxjs';
import { ApiService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';
@Component({
  selector: 'app-sub-admin-create-invoice',
  templateUrl: './sub-admin-create-invoice.component.html',
  styleUrls: ['./sub-admin-create-invoice.component.css']
})
export class SubAdminCreateInvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  isLoading: boolean = false;
  isUserLoading: boolean = false;
  userList: any = [];
  selectedUser: any;
  constructor(
    public dialogRef: MatDialogRef<SubAdminCreateInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _toasterService: ToasterService,
  ) { }
  ngOnInit() {
    this.createForm();
    this.getUserList();
  }

  createForm() {
    this.invoiceForm = this._fb.group({
      userId: ['', [ValidatorsService.selectRequired]],
      accountType: ['', [ValidatorsService.selectRequired]],
      amount: ['', [ValidatorsService.required]],
      reason: ['', [ValidatorsService.required]],
      paymentStatus: "unpaid"

    })
  }
  submit() {
    if (this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      return
    }
    if (this.invoiceForm.valid) {
      this.invoiceForm?.value?.accountType == 'shipment'?this.createShipmentInvoice():this.createMailboxInvoice();
    }
  }

createShipmentInvoice(){
  this.isLoading = true;
      this._apiService.createShipmentInvoice(this.invoiceForm.value).pipe(
        catchError((error) => {
          error ? this.isLoading = false : ''
          this._toasterService.errorToast(error?.message);
          return EMPTY;
        }), take(1)).subscribe(res => {
          if (res?.isSuccess) {
            this._toasterService.successToast('Invoice created successfully')
            this.dialogRef.close(true);
            this.isLoading = false
          }else{
            this.isLoading = false
          }
        })
}
createMailboxInvoice(){
  this.isLoading = true;
      this._apiService.createMailboxInvoice(this.invoiceForm.value).pipe(
        catchError((error) => {
          error ? this.isLoading = false : ''
          this._toasterService.errorToast(error?.message);
          return EMPTY;
        }), take(1)).subscribe(res => {
          if (res?.isSuccess) {
            this._toasterService.successToast('Invoice created successfully')
            this.dialogRef.close(true);
            this.isLoading = false
          }else{
            this.isLoading = false
          }
        })
}



  getUserList() {
    this.isUserLoading = true;
    this._apiService.getInvoiceUsersList().pipe(
      catchError((error) => {
        error ? this.isUserLoading = false : ''
        this._toasterService.errorToast(error?.message);
        return EMPTY;
      }), take(1)).subscribe(res => {
        if (res?.isSuccess) {
          this.userList = res?.data
          this.isUserLoading = false;
        } else {
          this.isUserLoading = false;
        }
      })
  }


  selectUser(event:any){
    let userData = this.userList?.filter((x:any)=> x.id == event?.value);
this.selectedUser = userData[0]
  }

}

