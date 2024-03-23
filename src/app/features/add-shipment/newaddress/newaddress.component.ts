import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-newaddress',
  templateUrl: './newaddress.component.html',
  styleUrls: ['./newaddress.component.css']
})
export class NewaddressComponent implements OnInit {

  verify:boolean = false;
  isloading: boolean = false;
  minDate: any;
  mask = '(000) 000-0000';
  isResidential: boolean = false;
  stateSub!: Subscription
  countrySub!: Subscription
  cityListSub!: Subscription

  senderAddressForm!: FormGroup;
  addressDetail: any
  addressId:any
  senderAddressFormSub!: Subscription;
  verifyAddressSub!: Subscription;
  userId: any;
  states: any = [];
  countries: any = [];
  cityList: any = [];
  shipDate: any;
  senderId: any;
  recevierId: any;
  constructor(private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private toasterService: ToasterService,
    private _apiService: ApiService,
    private _authService: AuthService,
  ) {
    // let date = new Date();
    this.minDate = new Date();
    // this.shipDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.userId = this._authService.getUserId();
    this.addressId = this._route.snapshot.params["id"];
  }

  ngOnInit(): void {
    if (this.addressId) {
      this.isloading = true;
      this._apiService.getAddresDetail(this.addressId).subscribe(data => {
        if (data.isSuccess) {
            this.addressDetail = data?.data
            this.isResidential = data?.data?.isResidential
            this.verify = this.isResidential
            this.getStateList();
            this.senderAddressForm.patchValue(this.addressDetail);
            this.isloading = false;
        
        } else {
          this.isloading = false;
        }
      })
    } else {
    }
    this.createForm();
    this.getCountryList();

  }
  ngAfterViewInit(): void {
    this.senderAddressForm.valueChanges.subscribe(data => {
      if (data) this.verify = false;
    })
    // if (this.addressType == 'receiver') {
    //   this.senderAddressForm.get('shipDate')?.clearValidators();
    //   this.senderAddressForm.get('shipDate')?.updateValueAndValidity();
    // }
  }
  createForm() {
    this.senderAddressForm = this._fb.group({
      shipDate: this.minDate,
      addressType: 'receiver',
      name: [this.addressDetail ? this.addressDetail.name : '', [ValidatorsService.required, ValidatorsService.nameValidator]],
      companyName: [this.addressDetail ? this.addressDetail.companyName : '',],
      email: [this.addressDetail ? this.addressDetail.email : '', [ValidatorsService.emailValidator]],
      address1: [this.addressDetail ? this.addressDetail.address1 : '', [ValidatorsService.required,ValidatorsService.maxAddress]],
      address2: [this.addressDetail ? this.addressDetail.address2 : '', [ValidatorsService.maxAddress]],
      address3: [this.addressDetail ? this.addressDetail.address3 : '', [,ValidatorsService.maxAddress]],
      country: [this.addressDetail ? this.addressDetail.country : '', [ValidatorsService.selectRequired]],
      countryShortCode: [this.addressDetail ? this.addressDetail.countryShortCode : '', [ValidatorsService.required]],
      state: [this.addressDetail ? this.addressDetail.state : '', [ValidatorsService.selectRequired]],
      stateShortCode: [this.addressDetail ? this.addressDetail.stateShortCode : '', [ValidatorsService.required]],
      city: [this.addressDetail ? this.addressDetail.city : '', [ValidatorsService.required, ValidatorsService.nameValidator]],
      zipCode: [this.addressDetail ? this.addressDetail.zipCode : '', [ValidatorsService.required, ValidatorsService.maxZip]],
      phone: [this.addressDetail ? this.addressDetail.phone : '', [ValidatorsService.required, ValidatorsService.phoneNumberValidator]],
      isResidential:[this.addressDetail ? this.addressDetail?.isResidential :false]
    })

  }

//   get PhoneNumber() {
//     return (
//      `${this.senderAddressForm.controls['phone'].value}`.
//        replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)

// ?.!x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
//       //  ?.join("(") || ""
//    );
//     }

// onValueChange(e:any) {
//   let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
//  return e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
// }


  verifyAddress() {
    if(this.verify){
      this.toasterService.successToast('Address already verified');
      // alert('Address allready verified');
      return
    }
    if (this.senderAddressForm.invalid) {
      this.senderAddressForm.markAllAsTouched();
      return;
    }
    try {
      if (this.senderAddressForm.valid) {
        let data = this.senderAddressForm.value;
        data.userId = this.userId

        // this.verifyAddres.emit(this.senderAddressForm.value)
        this.isloading = true;
        this._apiService.verifyAddress(data).subscribe(res => {
          if (res.isSuccess) {
              this.isResidential = res.data.isResidential;
              this.verify = res.data.isVerified;

              if(this.verify){
                this.toasterService.successToast('Address verified');
              } else{
                this.toasterService.errorToast('Invalid address');

              }
              this.isloading = false;
            }
           else if (!res.isSuccess) {
            // if (res.code == 'SERVICE.UNAVAILABLE.EXCEPTION') {
            //   this.toasterService.errorToast('Service unavialable for current time')
            // }else{
            //   this.toasterService.errorToast(res.message)

            // }
            this.isloading = false;
          }

        })
      }
    } catch { 
      this.isloading = false;
    }
  }

  goBack() {
    this._router.navigate(['/client/address-List']);
  }
  goTo() {
    if (this.senderAddressForm.valid) {
      if (this.verify) {
        let data = this.senderAddressForm.value;
        // data.isResidential = this.isResidential;
        this.createSenderAddress(data)
      } else {
        alert('please verify address first')
      }
    } else {
      this.senderAddressForm.markAllAsTouched();
    }
  }

  createSenderAddress(data: any) {
    if(this.addressId){
      this.isloading = true;
      this._apiService.updateAddress(data,this.addressId).subscribe(res => {
        if (res.isSuccess) {
          this._router.navigate(['/client/address-List']);
          
          this.isloading = false;
        }else{
          this.isloading = false;
        }
      })
    }else{
      this.isloading = true;
      this._apiService.addAddress(data).subscribe(res => {
        if (res.isSuccess) {
          this._router.navigate(['/client/address-List']);
          this.isloading = false;
        }else{
          this.isloading = false;
        }
      })
    } 
  }
  // createReceiverAddress(data: any) {
  //   let addressId: any = localStorage.getItem('addressId');
  //   this.isloading = true;
  //   this._apiService.createReceiverAddress(data, addressId).subscribe(res => {
  //     if (res.isSuccess) {
  //       this._router.navigate([this.next]);
  //       this.isloading = false;
  //     }else{
  //       this.isloading = false;
  //     }
  //   })
  // }




  selectCountryName(event: any) {
    this.senderAddressForm.controls['state'].reset();
    this.senderAddressForm.controls['countryShortCode'].reset();

    let data = this.countries.filter((e: any) => e.name = event.value);
    this.senderAddressForm.controls['countryShortCode'].setValue(data[0].code);
    this.getStateList();
  }
  selectStateName(event: any) {
    this.senderAddressForm.controls['stateShortCode']?.reset();
    this.senderAddressForm.controls['city']?.reset();
    let data = this.states.filter((e: any) => e.name == event.value);
    this.senderAddressForm.controls['stateShortCode'].setValue(data[0].abbreviation);
    // this.getCityList();
  }

  getCountryList() {
    this.countrySub = this._apiService.getCountryList().subscribe(res => {
      if (res.isSuccess) {
        this.countries = res.items.filter((e: any) => e.name == "United States of America")
      }
    });
  }
  getStateList() {
    let data = {
      country: this.senderAddressForm.controls['country'].value || this.addressDetail?.country
    }
    this.stateSub = this._apiService.getStateList(data).subscribe(res => {
      if (res.isSuccess) {
        this.states = res.items
      }
    })
  }
  // getCityList() {
  //   let data = {
  //     state: this.senderAddressForm.controls['state'].value
  //   }
  //   this.cityListSub = this._apiService.getCityList(data).subscribe(res => {
  //     if (res.isSuccess) {
  //       this.cityList = res.items
  //     }
  //   })
  // }

  ngOnDestroy() {
    if (this.senderAddressFormSub) this.senderAddressFormSub.unsubscribe();
    if (this.stateSub) this.stateSub.unsubscribe();
    if (this.cityListSub) this.cityListSub.unsubscribe();
    if (this.countrySub) this.countrySub.unsubscribe();
  }
}

