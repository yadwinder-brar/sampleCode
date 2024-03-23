import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService, AuthService, ApiService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { EMPTY, Subscription, catchError, take } from 'rxjs';
import { User_Role } from 'src/app/share/enums/userRoles';
@Component({
  selector: 'app-sender-address',
  templateUrl: './sender-address.component.html',
  styleUrls: ['./sender-address.component.css']
})
export class SenderAddressComponent implements OnInit {
  senderAddressForm!: FormGroup;
  isLoading:boolean=false;
  senderAddressFormSub!: Subscription;
  paidStatus: any;
  userRole: any;
  verify = false;
  shipDate: any;
  next = '/client/add-shipment/res';
  back = '/client/shipments';
  constructor(
    private _router: Router,
    private datePipe: DatePipe,
    private location:Location,
    private _apiServices: ApiService,
    private toasterService: ToasterService,
    private _authService: AuthService,
  ) {
    let date = new Date();
    this.shipDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    let userData = this._authService.getUserProfile();
    this.userRole = userData?.role
    if (this.userRole?.code === User_Role.ADMIN) {
      this.next = '/admin/add-shipment/res';
      this.back = '/admin/shipments';
    } else if (this.userRole?.code === User_Role.USER) {
      this.next = '/client/add-shipment/res';
      this.back = '/client/shipments';
    }

    this.getShipmentPaidStatus();

  }
  getShipmentPaidStatus() {
    this.isLoading = true;
    this._apiServices.getInvoicePaymentStatus().pipe(
      catchError((error) => {
        this.toasterService.errorToast(error?.message);
        this.isLoading = false;
        return EMPTY;
      }), take(1)
    ).subscribe(res => {
      if (res?.isSuccess) {
        this.paidStatus = res?.data?.result;
        if (this.paidStatus == false) {
          this.toasterService.errorToast('You have a unpaid invoice, please pay that invoice to create a new shipment');
          this.location.back();
        }
        this.isLoading = false;
      }else{
        this.isLoading = false;
      }
    })
  }

  ngOnInit(): void { 
  }

  verifyAddress(event: any) {
    let data = event;
    data.shipDate = this.shipDate;
    data.addressType = 'sender';
    this.senderAddressFormSub = this._apiServices.senderAddress(data).subscribe(res => {
      if (res.isSuccess) {
        this.verify = true
        // isResidential = res.isResidential
      }
    })



  }
  goTo() {
    this._router.navigate(['/client/add-shipment/res']);
  }



  ngOnDestroy() {
    if (this.senderAddressFormSub) this.senderAddressFormSub.unsubscribe();
  }
}
