import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { DatePipe, formatDate } from '@angular/common';
import { catchError, EMPTY, map, startWith, Subscription, take } from 'rxjs';
import { Observable } from 'rxjs';
import { User_Role } from 'src/app/share/enums/userRoles';


@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  @Input() addressType?: string = '';
  @Input() next?: string = '';
  @Input() back?: string = '';
  @Input() progress?: any;
  @Input() userRole?: any;
  @Input() verify?: boolean = false;
  isloading: boolean = false;
  minDate: any;
  mask = '(000) 000-0000';
  options: any = [];
  allAddresses: any = [];
  defaultAddress: any = [];
  // filteredOptions: Observable<any[]>[] = [];
  filteredOptions!: Observable<any[]>;
  // defaultAddress!: Observable<any>;
  isResidential: boolean = false;
  stateSub!: Subscription
  countrySub!: Subscription
  cityListSub!: Subscription

  @Output() verifyAddres: EventEmitter<any> = new EventEmitter();
  senderAddressForm!: FormGroup;
  senderDetail: any
  shipmentId: any
  senderAddressFormSub!: Subscription;
  verifyAddressSub!: Subscription;
  userId: any;
  states: any = [];
  countries: any = [];
  cityList: any = [];
  shipDate: any;
  senderId: any;
  recevierId: any;
  // myControl = new FormControl('');
  constructor(private _fb: FormBuilder,
    private _router: Router,
    private toasterService: ToasterService,
    private _apiService: ApiService,
    private _authService: AuthService,
    private datePipe: DatePipe,

  ) {
    // let date = new Date();
    this.minDate = new Date();
    this.minDate.setHours(0, 0, 0, 0);
    // this.shipDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.userId = this._authService.getUserId();
  }

  ngOnInit(): void {
    this.getDefaultAddress();
    this.shipmentId = localStorage.getItem('shipmentId');
    if (this.shipmentId) {
      this.isloading = true;
      this._apiService.getShipmentDetail(this.shipmentId).subscribe(data => {
        // this.shipDate = data?.data?.sender?.shipDate;
        if (data.isSuccess) {
          if (this.addressType == 'sender') {
            this.senderDetail = data?.data?.sender
            this.isResidential = data?.data?.sender?.isResidential
            this.verify = this.isResidential
            this.getStateList('');
            this.senderAddressForm.patchValue(this.senderDetail);
            this.shipDate = this.minDate;

            // let newData =JSON.parse(formatDate(this.senderDetail?.shipDate,'yyyy-MM-dd','en_US'));
            let newData: any = this.datePipe.transform(this.senderDetail?.shipDate, 'yyyy-MM-dd');
            this.minDate = this.datePipe.transform(this.minDate, 'yyyy-MM-dd');
            if (newData < this.minDate) {
              this.senderAddressForm.controls['shipDate'].setValue('');
              this.shipDate = this.minDate;
            }
            // this.myControl.setValue(this.senderDetail?.name);
            this.isloading = false;
            // this.displayFn(this.senderDetail)
          } else {
            this.senderDetail = data?.data?.receiver
            this.isResidential = data?.data?.receiver?.isResidential;
            this.verify = this.isResidential
            this.getStateList('');
            this.senderAddressForm.patchValue(this.senderDetail);
            let newData: any = this.datePipe.transform(this.senderDetail?.shipDate, 'yyyy-MM-dd');
            // this.myControl.setValue(this.senderDetail?.name);
            if (newData < this.minDate) {
              // this.senderAddressForm.controls['shipDate'].setValue('');
              this.senderAddressForm.controls['shipDate'].setValue(this.minDate);

            }
            this.isloading = false;
          }
        } else {
          this.isloading = false;
        }
        // if (this.addressType == 'sender') {
        //   this.senderDetail = data.sender;
        //   
        // } if (this.addressType == 'receiver') {
        //   this.senderDetail = data.receiver
        //   this.isResidential = data.isResidential
        // }
      })
    } else {
    }
    this.createForm();
    this.getCountryList();
    //     this.defaultAddress = this.myControl.valueChanges.pipe(startWith(''),
    //     map((value:any) => typeof value === 'string' ? value : value?.name),
    //     map(name => name ? this._filter(name) : this.options.slice())
    //   );
    // this.filteredOptions = this.senderAddressForm.get('name')?.valueChanges
    // .pipe(
    //   startWith(''),
    //   map((val:any) => this._filter(val))
    // );
    // this.defaultAddress = this.senderAddressForm.get('name')?.valueChanges.pipe(
    //   startWith(''),
    //   map((value:any) => typeof value === 'string' ? value : value?.name),
    //   map(name => name ? this._filter(name) : this.options.slice())
    // );
  }

  //   selectAddress(event:any){
  //  const filterValue = event.target.value.toLowerCase();

  //  this.defaultAddress = this.defaultAddress.filter((option:any) => option.name.toLowerCase() == filterValue);


  // }
  getDefaultAddress() {
    let data = {
      addressType: this.addressType,
      user: this.userId
    }

    this._apiService.getDefaultAddresses(data).subscribe(res => {
      if (res.isSuccess) {
        this.options = res?.items;
        this.defaultAddress = res?.items;
        this.allAddresses = res?.items
      }
    })
  }
  onSelectionChange(event: any) {
    let data = event.option.value
    data.countryShortCode = "US";
    this.getStateList(data?.country);
    // data?.
    this.senderAddressForm.patchValue(data);
    this.isResidential = data?.isResidential;
    this.verify = data?.isVerified;
    if(!data?.stateShortCode){
      let stateData = this.states.filter((e: any) => e.name == data?.state);
    this.senderAddressForm.controls['stateShortCode'].setValue(stateData[0].abbreviation);
    }
  }

  private _filter(value: any) {

    return this.defaultAddress.filter((option: any) => option?.name.toLowerCase().includes(value?.toLowerCase()));

    // return this.options.filter((s:any) => new RegExp(value, 'gi').test(s.name));
  }

  ngAfterViewInit(): void {
    // this.defaultAddress = this.senderAddressForm.get('name')?.valueChanges.pipe(
    //   startWith(''),
    //   map((value:any) => typeof value === 'string' ? value : value?.name),
    //   map(name => name ? this._filter(name) : this.options.slice())
    // );
    this.filteredOptions = this.senderAddressForm.controls['name']?.valueChanges.pipe(
      startWith(''),
      map((value: any) => (typeof value === 'string' ? value : value?.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );

    this.senderAddressForm.valueChanges.subscribe(data => {
      if (data) this.verify = false;
    })
    if (this.addressType == 'receiver') {
      this.senderAddressForm.get('shipDate')?.clearValidators();
      this.senderAddressForm.get('shipDate')?.updateValueAndValidity();
    }
    // if (this.addressType == 'receiver') {
    //   this.senderAddressForm.get('shipDate')?.clearValidators();
    //   this.senderAddressForm.get('shipDate')?.updateValueAndValidity();
    // }
  }
  displayFn(selectedoption: any) {

    return selectedoption ? selectedoption.name : ''

  }
  createForm() {
    this.senderAddressForm = this._fb.group({
      name: [this.senderDetail ? this.senderDetail?.name : '', [ValidatorsService.required]],
      // shipDate: [this.senderDetail ? this.senderDetail?.shipDate : '', [ValidatorsService.selectRequired]],
      shipDate: [this.minDate, []],
      companyName: [this.senderDetail ? this.senderDetail?.companyName : ''],
      email: [this.senderDetail ? this.senderDetail?.email : '', [ValidatorsService.emailValidator]],
      address1: [this.senderDetail ? this.senderDetail?.address1 : '', [ValidatorsService.required, ValidatorsService.maxAddress]],
      address2: [this.senderDetail ? this.senderDetail?.address2 : '', [ValidatorsService.maxAddress]],
      address3: [this.senderDetail ? this.senderDetail?.address3 : '', [ValidatorsService.maxAddress]],
      country: [this.senderDetail ? this.senderDetail?.country : '', [ValidatorsService.selectRequired]],
      countryShortCode: [this.senderDetail ? this.senderDetail?.countryShortCode : '', [ValidatorsService.required]],
      state: [this.senderDetail ? this.senderDetail?.state : '', [ValidatorsService.selectRequired]],
      stateShortCode: [this.senderDetail ? this.senderDetail?.stateShortCode : '', [ValidatorsService.required]],
      city: [this.senderDetail ? this.senderDetail?.city : '', [ValidatorsService.required, ValidatorsService.nameValidator]],
      zipCode: [this.senderDetail ? this.senderDetail?.zipCode : '', [ValidatorsService.required, ValidatorsService.maxZip]],
      phone: [this.senderDetail ? this.senderDetail?.phone : '', [ValidatorsService.required, ValidatorsService.phoneNumberValidator]],
    })

  }

  verifyAddress() {
    if (this.verify) {
      this.toasterService.successToast('Address already verified');
      // alert('Address all ready verified');
      return
    }
    if (this.senderAddressForm.invalid) {
      this.senderAddressForm.markAllAsTouched();
      return;
    }
    try {
      if (this.senderAddressForm.valid) {
        let data = this.senderAddressForm.value;
        data.addressType = this.addressType;
        data.userId = this.userId

        if (this.senderAddressForm.value.shipDate == '') {
          data.shipDate = this.shipDate
        }
        // this.verifyAddres.emit(this.senderAddressForm.value)
        this.isloading = true;
        this._apiService.verifyAddress(data).subscribe(res => {
          if (res.isSuccess) {
            this.isResidential = res.data.isResidential;
            this.verify = res.data.isVerified;

            if (this.verify) {
              this.toasterService.successToast('Address verified');
            } else {
              this.toasterService.errorToast('Invalid address');

            }
            this.isloading = false;
          }
          else if (!res.isSuccess) {
            // if (res.code == 'SERVICE.UNAVAILABLE.EXCEPTION') {
            //   this.toasterService.errorToast('Service un available for current time')
            // }else{
            //   this.toasterService.errorToast(res.message)

            // }
            this.isloading = false;
          }

        })
      }
    } catch {
      this.isloading = false;
      // this.toasterService.errorToast('error')
    }
  }
  resetForm() {
    this.senderAddressForm.markAsPristine();
    this.senderAddressForm.reset();

  }
  goBack() {
    this._router.navigate([this.back]);
  }
  addressModeSet(event: any) {
    this.isResidential = event?.checked;
  }
  goTo() {
    if (this.senderAddressForm.valid) {
      // if (this.verify || this.isResidential) {
      let data = this.senderAddressForm.value;
      // if(this.senderId){
      //   data.senderId = this.senderId;
      // }
      // if(this.recevierId){
      //   data.recevierId = this.senderId;
      // }
      data.addressType = this.addressType
      data.isResidential = this.isResidential;
      this.addressType == "sender" ? this.createSenderAddress(data) : this.createReceiverAddress(data)
      // } else {
      //   alert('please verify address first')
      // }
    } else {
      this.senderAddressForm.markAllAsTouched();
    }
  }

  createSenderAddress(data: any) {
    if (this.shipmentId) {
      this.isloading = true;
      this._apiService.updateSenderAddress(data, this.shipmentId).pipe(
        catchError((error) => {
          error?this.isloading = false:''
          this.toasterService.errorToast(error?.message);
          return EMPTY;
        }),take(1)
      ).subscribe(res => {
        if (res.isSuccess) {
          this._router.navigate([this.next]);

          this.isloading = false;
        }else{

          this.isloading = false;
        }
      })
    } else {
      this.isloading = true;
      this._apiService.createSenderAddress(data).pipe(
        catchError((error) => {
          error?this.isloading = false:''
          this.toasterService.errorToast(error?.message);
          return EMPTY;
        }),take(1)
      ).subscribe(res => {
        if (res.isSuccess) {
          localStorage.setItem('shipmentId', res.data._id)
          this._router.navigate([this.next]);
          this.isloading = false;
        } else {
          this.isloading = false;
        }
      })
    }
  }
  createReceiverAddress(data: any) {
    let shipmentId: any = localStorage.getItem('shipmentId');
    this.isloading = true;
    this._apiService.createReceiverAddress(data, shipmentId).subscribe(res => {
      if (res.isSuccess) {
        this._router.navigate([this.next]);
        this.isloading = false;
      } else {
        this.isloading = false;
      }
    })
  }




  selectCountryName(event: any) {
    this.senderAddressForm.controls['state'].reset();
    this.senderAddressForm.controls['countryShortCode'].reset();

    let data = this.countries.filter((e: any) => e.name = event.value);
    this.senderAddressForm.controls['countryShortCode'].setValue(data[0].code);
    this.getStateList('');
  }
  selectStateName(event: any) {
    this.senderAddressForm.controls['stateShortCode']?.reset();
    this.senderAddressForm.controls['city']?.reset();
    let data = this.states.filter((e: any) => e.name == event.value);
    this.senderAddressForm.controls['stateShortCode'].setValue(data[0].abbreviation);
    this.getCityList();
  }

  getCountryList() {
    this.countrySub = this._apiService.getCountryList().subscribe(res => {
      if (res.isSuccess) {
        this.countries = res.items.filter((e: any) => e.name == "United States of America")
      }
    });
  }
  getStateList(items: any) {
    let data = {
      country: this.senderAddressForm.controls['country'].value || this.senderDetail?.country || items
    }
    this.stateSub = this._apiService.getStateList(data).subscribe(res => {
      if (res.isSuccess) {
        this.states = res.items
      }
    })
  }
  getCityList() {
    let data = {
      state: this.senderAddressForm.controls['state'].value
    }
    this.cityListSub = this._apiService.getCityList(data).subscribe(res => {
      if (res.isSuccess) {
        this.cityList = res.items
      }
    })
  }
  close() {
    if (this.userRole?.code === User_Role.ADMIN) {
      this._router.navigate(['/admin/shipments']);
    }
    else if (this.userRole?.code === User_Role.USER) {
      this._router.navigate(['/client/shipments']);
    }
  }
  saveToDraft() {
    this.toasterService.successToast('Shipment drafted successfully');
    this.close();
  }
  ngOnDestroy() {
    if (this.senderAddressFormSub) this.senderAddressFormSub.unsubscribe();
    if (this.stateSub) this.stateSub.unsubscribe();
    if (this.cityListSub) this.cityListSub.unsubscribe();
    if (this.countrySub) this.countrySub.unsubscribe();
  }
}
