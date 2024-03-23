import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  userProfileDetail: any;
  profileImg:any
  isloading:boolean = false;
  editProfileForm!: FormGroup;
  stateSub!: Subscription;
  countrySub!: Subscription
  countries: any = [];
  states: any = [];
  cities: any = [];
  mask = '(000) 000-0000';
  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _authService: AuthService,
    private _router: Router,
    private location: Location,
    private _toasterService: ToasterService,

  ) {
    this.userProfileDetail = this._authService.getUserProfile();
    this.profileImg = this.userProfileDetail?.currentProfile?.profilePicture
  }

  ngOnInit(): void {
    this.getCountryList();
    this.createForm();
    this.getStateList();
    this.getCityList();
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
      country: this.editProfileForm.controls['country'].value || this.userProfileDetail?.currentProfile?.state
    }
    this.stateSub = this._apiService.getStateList(data).subscribe(res => {
      if (res.isSuccess) {
        this.states = res.items
      }
    })
  }
  getCityList() {
    let data = { state: this.editProfileForm.controls['state'].value || this.userProfileDetail?.currentProfile?.city }
    this.stateSub = this._apiService.getCityList(data).subscribe(res => {
      if (res.isSuccess && res?.items[0]?.cities) {
        this.cities = res?.items[0]?.cities
      }
    })
  }

  createForm() {
    this.editProfileForm = this._fb.group({
      name: [this.userProfileDetail ? this.userProfileDetail?.currentProfile?.name : '', [ValidatorsService.required, ValidatorsService.nameValidator]],
      companyName: [this.userProfileDetail ? this.userProfileDetail?.currentProfile?.companyName : '', []],
      address1: [this.userProfileDetail ? this.userProfileDetail?.currentProfile?.address1 : '', [ValidatorsService.required]],
      address2: [this.userProfileDetail ? this.userProfileDetail?.currentProfile?.address2 : '', []],
      city: [this.userProfileDetail ? this.userProfileDetail?.currentProfile?.city : '', [ValidatorsService.selectRequired]],
      state: [this.userProfileDetail ? this.userProfileDetail.currentProfile?.state : '', [ValidatorsService.selectRequired]],
      country: [this.userProfileDetail ? this.userProfileDetail?.currentProfile?.country : '', [ValidatorsService.selectRequired]],
      zipCode: [this.userProfileDetail ? this.userProfileDetail?.currentProfile?.zipCode : '', [ValidatorsService.required, ValidatorsService.specailCharacter, ValidatorsService.maxZip]],
      phone: [this.userProfileDetail ? this.userProfileDetail?.currentProfile?.phone : '', [ValidatorsService.required, ValidatorsService.phoneNumberValidator]],
    })
  }
  selectCountryName(event: any) {
    this.editProfileForm.controls['state'].reset();
    this.editProfileForm.controls['city'].reset();
    // this.editProfileForm.controls['countryShortCode'].reset();

    // let data = this.countries.filter((e:any)=> e.name = event.value);
    // this.accountInfoForm.controls['countryShortCode'].setValue(data[0].code);
    this.getStateList();
  }
  selectStateName(event: any) {
    this.editProfileForm.controls['city'].reset();
    this.getCityList();
    // let data = this.states.filter((e:any)=> e.name = event.value);
    // this.accountInfoForm.controls['countryShortCode'].setValue(data[0].abbreviation);
  }

  submit() {
    if (this.editProfileForm.invalid) {
      this.editProfileForm.markAllAsTouched();
      return;
    }
    if (this.editProfileForm.valid) {
      this.isloading = true;
      let data = this.editProfileForm.value;
      data.profilePicture = this.profileImg;
      this._apiService.updateProfile(data, this.userProfileDetail?.currentProfile?.id).subscribe(res => {
        if (res?.isSuccess) {
          this._apiService.getUserDetail(this.userProfileDetail?.id).subscribe(data=>{
            if (data?.isSuccess){
            this._authService.removeUserProfile();
            this._authService.storeUserProfile(data?.data);
            this.location.back();
            this.isloading = false;
            }else{
              this.isloading = false;
            }
          })
        }else{
          this.isloading = false;
        }
      })
    }
  }

  imgUpload(event: any) {
    this.profileImg = event[0];
  }

}
