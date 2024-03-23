import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage, StorageKeys } from 'src/app/core/config/constants.config';
import { LoginService, ApiService, AuthService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-post-office-mailbox2',
  templateUrl: './post-office-mailbox2.component.html',
  styleUrls: ['./post-office-mailbox2.component.css']
})
export class PostOfficeMailbox2Component implements OnInit {
  form!: FormGroup;
  mask = '(000) 000-0000';
  profileData: any;
  isLoading: boolean = false
  constructor(private _formBuilder: FormBuilder,
    private _apiServices: ApiService,
    private router: Router,
    private _authService: AuthService) {

    let data = this._authService.getUserProfile();
    let item:any = localStorage.getItem('postOfficeForm2values');
    item = item?JSON.parse(item):''
    this.profileData = data?.currentProfile;
    this.profileData.email = data?.email
    this.profileData.signature = item?.signature || ''
  }
  createForm() {
    this.form = this._formBuilder.group({
      signature: [this.profileData ? this.profileData.signature : '', [ValidatorsService.required]],
      name: [this.profileData ? this.profileData.name : '', [ValidatorsService.required, ValidatorsService.nameValidator]],
      companyName: [this.profileData ? this.profileData.companyName : '', []],
      address1: [this.profileData ? this.profileData.address1+ (' '+this.profileData.address2||''): '', [ValidatorsService.required]],
      address2: [this.profileData ? this.profileData.address2 : '', []],
      city: [this.profileData ? this.profileData.city : '', [ValidatorsService.required]],
      state: [this.profileData ? this.profileData.state : '', [ValidatorsService.selectRequired]],
      email: [this.profileData ? this.profileData.email : '', [ValidatorsService.selectRequired]],
      zipCode: [this.profileData ? this.profileData.zipCode : '', [ValidatorsService.required, ValidatorsService.specailCharacter, ValidatorsService.maxZip]],
      phone: [this.profileData ? this.profileData?.phone : '', [ValidatorsService.required, ValidatorsService.phoneNumberValidator]],
    })
  }
  ngOnInit(): void {
    this.createForm();
  }
  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      // alert('please enter mailbox form details')
      return;
    }
    let postData= JSON.parse(localStorage.getItem('postOfficeFormValues')||'')
    let data:any ={...this.form.value,...postData}
    let item = { postOfficeForm:data}
    localStorage.setItem('postOfficeForm2values', JSON.stringify(this.form.value))
    this.isLoading = true;
    let userProfile: any = this._authService.getUserProfile();
    let userId = userProfile?.profiles?.filter((p: any) => p.accountType === "virtualMailBox");
    this._apiServices.addProfileDocs(item,userId[0].id).subscribe((res: any) => {
      if (res.isSuccess) {
        this.router.navigate(['/proof-mailbox']);
        this.isLoading = false
      } else {
        this.isLoading = false
      }
    })

  }

  error(control: any, name: any) {
    return ValidatorsService.error(control?.errors, name);
  }



}
