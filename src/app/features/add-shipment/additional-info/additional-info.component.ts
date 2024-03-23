import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { Location } from '@angular/common';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { User_Role } from 'src/app/share/enums/userRoles';
@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit {
  shipmentId: any;
  userType:string = 'normal';
  next: string = '/client/add-shipment/shipment'
  shipmentInfo: any;
  AddInfoData: any
  isloading: boolean = false;
  additinalInfoForm!: FormGroup;
  updatedData: any;
  userRole: any;
  carrierType:any;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _authService: AuthService,
    private _toasterService: ToasterService,
    private location: Location,
    private dialog: MatDialog,
  ) {

    let userData = this._authService.getUserProfile();
    this.carrierType = localStorage.getItem('carrierType')
    this.AddInfoData = this._authService.getAdditionalInfo();
    this.userRole = userData?.role
    this.shipmentId = localStorage.getItem('shipmentId');
    let sessionId = this._activatedRoute.snapshot.queryParamMap.get('sessionId');
    
    if (sessionId) {

      this.shipmentPaymentVerification(sessionId, this.shipmentId);
    }
    // this.shipmentId = '6423de6a01a62c2c5792e783';
    if (!this.shipmentId) {
      if (this.userRole?.code === User_Role.ADMIN) {
        this._router.navigate(['admin/shipments'])
  
      } else if (this.userRole?.code === User_Role.USER) {
        this._router.navigate(['/client/shipments']);
  
      }
    }

    if (this.userRole?.code === User_Role.ADMIN) {
      this.next = '/admin/add-shipment/shipment';

    } else if (this.userRole?.code === User_Role.USER) {
      this.next = '/client/add-shipment/shipment';

    }
  }

  ngOnInit(): void {
    if (this.shipmentId) {
      this.isloading = true;
      this._apiService.getShipmentDetail(this.shipmentId).subscribe(res => {
        if (res.isSuccess) {
          this.shipmentInfo = res.data;
          this.isloading = false;
          this.updateQuotes();
        } else {
          this.isloading = false;
        }
      })
    } else {
      this.location.back();
      this.isloading = false;
    }
    this.createForm();
    this.getUserDetail();
  }
  getUserDetail(){
    this._apiService.getUserPositionTag().subscribe(res=>{
     if(res?.isSuccess) {
       this.userType = res?.data?.userPositionTag
     }
    })
  }
  editSender() {
    if (this.userRole?.code === User_Role.ADMIN) {

      this._router.navigate(['admin/add-shipment/sender-address'])
    } else if (this.userRole?.code === User_Role.USER) {
      this._router.navigate(['client/add-shipment/sender-address'])

    }
  }
  editReceiver() {
    if (this.userRole?.code === User_Role.ADMIN) {

      this._router.navigate(['admin/add-shipment/res'])
    } else if (this.userRole?.code === User_Role.USER) {
      this._router.navigate(['client/add-shipment/res'])

    }
  }
  editPackage() {
    if (this.userRole?.code === User_Role.ADMIN) {

      this._router.navigate(['admin/add-shipment/pakage-info'])
    } else if (this.userRole?.code === User_Role.USER) {
      this._router.navigate(['client/add-shipment/pakage-info'])

    }
  }
  editshipmentServices() {
    if (this.userRole?.code === User_Role.ADMIN) {

      this._router.navigate(['admin/add-shipment/arrival-pref'])
    } else if (this.userRole?.code === User_Role.USER) {
      this._router.navigate(['client/add-shipment/arrival-pref'])

    }
    // this._router.navigate(['client/add-shipment/arrival-pref'])
  }
  updateQuotes() {
    let data = ''
    this.isloading = true;
    this._apiService.updateQuotes(data, this.shipmentId,this.carrierType).subscribe(res => {
      if (res.isSuccess) {
        let data = res?.data?.serviceQuote;
        this.updatedData = data.reduce(
          (obj: any, item: any) => Object.assign({ ...obj, [item.name]: item.value }), {});
          this.isloading = false;
      }else{
        this.isloading = false;
      }
    })
  }
  createShipment() {
    if (this.additinalInfoForm.invalid) {
      this.additinalInfoForm.markAllAsTouched();
      return
    }
    if (this.additinalInfoForm.valid) {

      this.dialog
        .open(ConfirmationComponent, {
          maxWidth: '390px',
          minWidth: '390px',
          panelClass: 'dailogClass',
          data: {
            title: 'Create shipment',
            panelClass: 'dailogClass',
            description: 'Are you sure? Please double check the information you entered before continuing.',
          },
        })
        .afterClosed().subscribe(res => {
          if (res) {
            
            this.isloading = true;
            // localStorage.setItem('additionalinfoForm', JSON.stringify(this.additinalInfoForm.value));
           this.completeShipment();
           
            // this._apiService.paymentShipment(data).subscribe(res => {
            //   if (res.isSuccess) {
            //     let a = document.createElement('a');
            //     a.href = `${res?.data}`;
            //     a.click();
            //     // this.isloading = false;
            //   } else {
            //     this.isloading = false;
            //   }
            // })
            //  this._apiService.createShipment(this.shipmentId, this.additinalInfoForm.value).subscribe(res => {
            //   if (res.isSuccess) {
            //     if (this.additinalInfoForm.controls['paymentType'].value == 'Sender') {
            //       this._router.navigate([this.next]);
            //       this.isloading = false;
            //     } else {
            //       this.isloading = false;
            //       this._toasterService.successToast('Shipment created sucessfully')
            //       if(this.userRole?.code === User_Role.ADMIN){
            //         this._router.navigate(['/admin/shipments/shipment-detail/' +this.shipmentId]);
            //       } else if(this.userRole?.code === User_Role.USER){
            //         this._router.navigate(['/client/shipments/shipment-detail/' +this.shipmentId]);

            //       } 
            //     }
            //   } else {
            //     this.isloading = false;
            //   }
            // })
          }
        })
    }
  }
  alcholeRequired(e: any) {
    if (e.value == 'yes') {
      this.additinalInfoForm.controls['alcoholRecipientType'].setValidators(ValidatorsService.selectRequired);
      this.additinalInfoForm.controls['alcoholRecipientType'].updateValueAndValidity();
    }
    else {
      this.additinalInfoForm.controls['alcoholRecipientType'].setValue('');
      this.additinalInfoForm.controls['alcoholRecipientType'].clearValidators();
      this.additinalInfoForm.controls['alcoholRecipientType'].updateValueAndValidity();
    }
  }
  batteryRequired(e: any) {
    if (e.value == 'yes') {
      this.additinalInfoForm.controls['batteryPackingType'].setValidators(ValidatorsService.selectRequired);
      this.additinalInfoForm.controls['batteryPackingType'].updateValueAndValidity();
      this.additinalInfoForm.controls['batteryMaterialType'].setValidators(ValidatorsService.selectRequired)
      this.additinalInfoForm.controls['batteryMaterialType'].updateValueAndValidity();
    } else {
      this.additinalInfoForm.controls['batteryPackingType'].clearValidators();
      this.additinalInfoForm.controls['batteryPackingType'].updateValueAndValidity();
      this.additinalInfoForm.controls['batteryMaterialType'].setValue('');
      this.additinalInfoForm.controls['batteryMaterialType'].clearValidators();
      this.additinalInfoForm.controls['batteryMaterialType'].updateValueAndValidity();
    }
  }
  createForm() {
    this.additinalInfoForm = this._fb.group({
      signature: ['',],
      alcohole: ['',],
      alcoholRecipientType: [''],
      LithiumBatteries: [''],
      batteryPackingType: [''],
      batteryMaterialType: [''],
      paymentType: ['Sender', ValidatorsService.selectRequired]
    })
  }

  completeShipment() {
    let carrierType = localStorage.getItem('carrierType');
    this.isloading = true;
    this._apiService.createShipment(this.shipmentId, this.additinalInfoForm.value,carrierType).subscribe(res => {
      if (res.isSuccess) {
        // this._router.navigate([this.next]);
        // this.isloading = false;
        if (this.userRole?.code === User_Role.ADMIN) {
          this._toasterService.successToast('Shipment created successfully');
          this._router.navigate(['/admin/shipments/shipment-detail/' + this.shipmentId]);
          // this._router.navigate(['/admin/add-shipment/payment/' + this.shipmentId]);
        } else if (this.userRole?.code === User_Role.USER) {
          let userData = this._authService.getUserProfile();
          if( this.userType == 'pro'){
            this._router.navigate(['/client/shipments/shipment-detail/' + this.shipmentId]);
          }else{
            this._router.navigate(['/client/add-shipment/payment/' + this.shipmentId]);

          }

        }
        // let data = {
        //   shipmentId: this.shipmentId
        // }
        // this._apiService.paymentShipment(data).subscribe(res => {
        //     if (res.isSuccess) {
        //       let a = document.createElement('a');
        //       a.href = `${res?.data}`;
        //       a.click();
        //       // this.isloading = false;
        //     } else {
        //       this.isloading = false;
        //     }
        //   })

      } else {
        this.isloading = false;
      }
    })
  }

  shipmentPaymentVerification(id: any, shipmentId: any) {
    let data = {
      url: id,
      shipmentId: shipmentId,
    }
    this.isloading = true;
    this._apiService.shipmentPaymentVerification(data).subscribe(res => {
      if (res?.isSuccess && res?.data) {
        // this.completeShipment();
        // this._authService.storeUserProfile(res?.data);
        // this.isloading = false;
        if (this.userRole?.code === User_Role.ADMIN) {
            this._router.navigate(['/admin/shipments/shipment-detail/' + this.shipmentId]);
          } else if (this.userRole?.code === User_Role.USER) {
            this._router.navigate(['/client/shipments/shipment-detail/' + this.shipmentId]);
  
          }
      } else {
        this.isloading = false;
      }
    })
  }

}
