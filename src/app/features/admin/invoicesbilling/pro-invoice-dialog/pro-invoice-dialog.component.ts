import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { EMPTY, catchError, take } from 'rxjs';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';
@Component({
  selector: 'app-pro-invoice-dialog',
  templateUrl: './pro-invoice-dialog.component.html',
  styleUrls: ['./pro-invoice-dialog.component.css']
})
export class ProInvoiceDialogComponent implements OnInit {
  @ViewChild('allSelect') private allSelected!: MatOption;
  proInvoiceForm!: FormGroup;
  isLoading: boolean = false;
  selectedAll: boolean = false;
  isUserLoading: boolean = false;
  userList: any = [];
  invoiceList: any = [];
  selectedUser: any;
  constructor(
    public dialogRef: MatDialogRef<ProInvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _authService: AuthService,
    private _toasterService: ToasterService,
  ) { }
  ngOnInit() {
    this.createForm();
    this.getUserList();
  }

  createForm() {
    this.proInvoiceForm = this._fb.group({
      userId: ['', [ValidatorsService.selectRequired]],
      invoiceIds: ['', [ValidatorsService.selectRequired]],
      amount: ['', [ValidatorsService.required]],
      reason: ['', [ValidatorsService.required]],
      paymentStatus: "unpaid",
      additionalAmount: ['']

    })
  }
  submit() {
    if (this.proInvoiceForm.invalid) {
      this.proInvoiceForm.markAllAsTouched();
      return
    }
    if (this.proInvoiceForm.valid) {
      this.isLoading = true;
    this._apiService.createSpecialInvoice(this.proInvoiceForm.value).pipe(
      catchError((error) => {
        error ? this.isLoading = false : ''
        this._toasterService.errorToast(error?.message);
        return EMPTY;
      }), take(1)).subscribe(res => {
        if (res?.isSuccess) {
          this._toasterService.successToast('Invoice created successfully')
          this.dialogRef.close(true);
          this.isLoading = false
        } else {
          this.isLoading = false
        }
      })
    }
  }

  createShipmentInvoice() {
   
  }
  createMailboxInvoice() {
    this.isLoading = true;
    this._apiService.createMailboxInvoice(this.proInvoiceForm.value).pipe(
      catchError((error) => {
        error ? this.isLoading = false : ''
        this._toasterService.errorToast(error?.message);
        return EMPTY;
      }), take(1)).subscribe(res => {
        if (res?.isSuccess) {
          this._toasterService.successToast('Invoice created successfully')
          this.dialogRef.close(true);
          this.isLoading = false
        } else {
          this.isLoading = false
        }
      })
  }
  calculateAmount() {
    if (this.proInvoiceForm.get('invoiceIds')?.value) {
      let invoiceIds =  this.proInvoiceForm.get('invoiceIds')?.value
      let data= {
        invoiceIds:invoiceIds
      } 
      let id =this._authService.getUserId();
      this.isLoading = true;
      this._apiService.calculateAmount(id,data).pipe(
        catchError((error) => {
          error ? this.isLoading = false : ''
          this._toasterService.errorToast(error?.message);
          return EMPTY;
        }), take(1)).subscribe(res => {
          if(res?.isSuccess){
            this.proInvoiceForm.get('amount')?.setValue(res?.data)
            this.isLoading = false
          }else{
            this.isLoading = false
          }
        })
    } else {
      this.isLoading = false;
      this._toasterService.warningToast('please select invoice')
    }
  }


  getUserList() {
    this.isUserLoading = true;
    let data = 'pro'
    this._apiService.getInvoiceUsersList(data).pipe(
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


  selectUser(event: any) {
    //     debugger
    //     let userData = this.userList?.filter((x:any)=> x.id == event?.value);
    // this.selectedUser = userData[0]

    this.getInvoiceList(event.value);
  }

  getInvoiceList(userId: string) {
    this.isLoading = true
    this._apiService.getProInvoicesList(userId).pipe(
      catchError((error) => {
        error ? this.isLoading = false : ''
        this._toasterService.errorToast(error?.message);
        return EMPTY;
      }), take(1)).subscribe(res => {
        if (res?.isSuccess) {
          this.invoiceList = res?.items
          if(this.invoiceList&& this.invoiceList.length ==0){
            this._toasterService.warningToast('This user has no unpaid invoices');
          }
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      })
  }


selectToggle(event:any){
  if(event?.checked){
    this.selectedAll = true
    this.proInvoiceForm.controls['invoiceIds'].patchValue([
      ...this.invoiceList.map((item:any) => item?.id)
    ])
  }else{
    this.proInvoiceForm.controls['invoiceIds'].patchValue('');
    this.selectedAll = false
  }
}

singleSelect(all:any) {
  if (this.proInvoiceForm.controls['invoiceIds'].value.length ==this.invoiceList.length){ 
    this.allSelected.select();
    this.selectedAll = true
  }else{
    this.selectedAll = false
  }
}




}


