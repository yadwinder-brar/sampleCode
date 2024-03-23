import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY, catchError, take } from 'rxjs';
import { ApiService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { User_Role } from 'src/app/share/enums/userRoles';

@Component({
  selector: 'app-sub-admin-invoice-dialog',
  templateUrl: './sub-admin-invoice-dialog.component.html',
  styleUrls: ['./sub-admin-invoice-dialog.component.css']
})
export class SubAdminInvoiceDialogComponent implements OnInit {
    invoiceForm!: FormGroup;
    isLoading: boolean = false;
    isUserLoading: boolean = false;
    userList: any = [];
    selectedUser: any;
    constructor(
      public dialogRef: MatDialogRef<SubAdminInvoiceDialogComponent>,
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
        let data = {
          pageNo: 1,
          pageSize: 1000,
          search:'',
          status:'active',
          sort: 'createdAt,DSC',
          userPositionTag:'normal',
          accountType: 'shipment',
          role:User_Role.SUB_ADMIN
        }
      this.isUserLoading = true;
      this._apiService.getUsersList(data).pipe(
        catchError((error) => {
          error ? this.isUserLoading = false : ''
          this._toasterService.errorToast(error?.message);
          return EMPTY;
        }), take(1)).subscribe(res => {
          if (res?.isSuccess) {
            this.userList = res?.items
            this.isUserLoading = false;
          } else {
            this.isUserLoading = false;
          }
        })
    }

  
    selectUser(event:any){
  //     let userData = this.userList?.filter((x:any)=> x.id == event?.value);
  // this.selectedUser = userData[0];
    }
  
  }
  
  
