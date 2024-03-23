import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { StorageKeys } from 'src/app/core/config/constants.config';
import { ApiService, AuthService, LocalStorageService, LoginService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { AcountTypeService } from '../../services/acount-type.service';

@Component({
  selector: 'app-accout-info',
  templateUrl: './accout-info.component.html',
  styleUrls: ['./accout-info.component.css']
})
export class AccoutInfoComponent implements OnInit {
  accountInfoForm!: FormGroup;
  mask = '(000) 000-0000';
  profileData:any;
  isLoading:boolean= false
  accountType: string = '';
  stateSub!: Subscription
  countrySub!: Subscription
  countries:any=[];
  states:any=[];
  cities:any = [];
  accountInfoSub!: Subscription
  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private _loginServices: LoginService,
    private _accountType: AcountTypeService,
    private _apiService: ApiService,
    private _authService: AuthService
  ) { 
   let data = this._authService.getUserProfile();
   this.profileData = data?.currentProfile;

   let accountType = localStorage.getItem('accountType');
   this.accountType = accountType?accountType :''

   if(this.profileData){
    this.getStateList();
   }
  }

  ngOnInit(): void {
    this.getAccountInfo();
    this._accountType.accountType$.subscribe(data => {
      this.accountType = data ? data : this.accountType;
    })
    this.createForm();
    this.getCountryList();
  }

  getAccountInfo(){

    // this._apiService.getAccountIfo(this.use).subscribe(res=>{
    //   if(res.isSuccess){
    //     this.userInfo = res?.data?.profile;
    //     api/users/6410030d817a081bee50d7a2
    //   }
    // })
  }

  createForm() {
    this.accountInfoForm = this._formBuilder.group({
      name: [this.profileData?this.profileData.name:'', [ValidatorsService.required,ValidatorsService.nameValidator]],
      companyName: [this.profileData?this.profileData.companyName:'', []],
      address1: [this.profileData?this.profileData.address1:'', [ValidatorsService.required]],
      address2: [this.profileData?this.profileData.address2:'', []],
      city: [this.profileData?this.profileData.city:'', [ValidatorsService.required]],
      state: [this.profileData?this.profileData.state:'', [ValidatorsService.selectRequired]],
      country: [this.profileData?this.profileData.country:'', [ValidatorsService.selectRequired]],
      zipCode: [this.profileData?this.profileData.zipCode:'', [ValidatorsService.required,ValidatorsService.specailCharacter, ValidatorsService.maxZip]],
      phone: [this.profileData?this.profileData?.phone : '', [ValidatorsService.required, ValidatorsService.phoneNumberValidator]],
      accountType: [this.accountType],
      type:[this.profileData?'update':'create']
    })
  }

  // "userId":"63e353691ae9e7e97890b09d"
  // "accountType":"shipment",    
  selectCountryName(event: any) {
    this.accountInfoForm.controls['state'].reset();
    this.accountInfoForm.controls['city'].reset();
    // this.accountInfoForm.controls['countryShortCode'].reset();

    // let data = this.countries.filter((e:any)=> e.name = event.value);
    // this.accountInfoForm.controls['countryShortCode'].setValue(data[0].code);
    this.getStateList();
  }
  selectStateName(event: any) {
    this.accountInfoForm.controls['city'].reset();
    this.getCityList();
    // let data = this.states.filter((e:any)=> e.name = event.value);
    // this.accountInfoForm.controls['countryShortCode'].setValue(data[0].abbreviation);
  }
  getCountryList() {
    this.countrySub = this._apiService.getCountryList().subscribe(res => {
      if (res.isSuccess) {
        this.countries = res.items.filter((e:any)=> e.name == "United States of America")

      }
    });
  }
  getStateList() {
    let data={
      country:this.accountInfoForm?.controls['country']?.value || this.profileData?.state
    }
    this.stateSub = this._apiService.getStateList(data).subscribe(res => {
      if (res.isSuccess) {
        this.states = res.items
      }
    })
  }
  getCityList() {
    let data = { state:this.accountInfoForm.controls['state'].value}
    this.stateSub = this._apiService.getCityList(data).subscribe(res => {
      if (res.isSuccess && res?.items[0]?.cities) {
        this.cities = res?.items[0]?.cities
      }
    })
  }
  next() {
    if (this.accountInfoForm.invalid) {
      this.accountInfoForm.markAllAsTouched();
      return
    }
    if (this.accountInfoForm.valid) {
      this.isLoading = true
      let userId: any = localStorage.getItem(StorageKeys.UserId);
      this.accountInfoSub = this._loginServices.createUserProfile(userId, this.accountInfoForm.value).subscribe((res: any) => {
        if (res.isSuccess) {
         this._authService.storeUserProfile(res.data);
         this.accountType === 'both' || this.accountType === 'virtualMailBox'?this.router.navigate(['/post-mail-box']):this.router.navigate(['/carrier-pref'])
         this.isLoading= false
        }else{
          this.isLoading= false
        }
      })
    }
  }
  ngOnDestroy() {
    if (this.accountInfoSub) this.accountInfoSub.unsubscribe();
  }

}
