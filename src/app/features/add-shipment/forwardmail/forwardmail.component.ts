  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { Subscription } from 'rxjs/internal/Subscription';
  import { Location } from '@angular/common';
  import { ApiService, ToasterService} from 'src/app/core/services';
  import { ValidatorsService } from 'src/app/core/services/validation.service';
import { catchError, EMPTY, take } from 'rxjs';
  
  @Component({
    selector: 'app-forwardmail',
    templateUrl: './forwardmail.component.html',
    styleUrls: ['./forwardmail.component.css']
  })
  export class ForwardmailComponent implements OnInit {
    accountInfoForm!: FormGroup;
    profileData:any;
    isLoading:boolean= false
    accountType: string = '';
    stateSub!: Subscription
    countrySub!: Subscription
    countries:any=[];
    states:any=[];
    cities:any = [];
    mask = '(000) 000-0000';
    labelId:any = '';
    labelIds:string[]= [];
    accountInfoSub!: Subscription
    constructor(private router: Router,
      private _route: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private location:Location,
      private _apiService: ApiService,
      private _toasterService: ToasterService,
    ) { 
    //  let data = this._authService.getUserProfile();
    //  this.profileData = data?.currentProfile;
  
    //  let accountType = localStorage.getItem('accountType');
    //  this.accountType = accountType?accountType :''
  
    //  if(this.profileData){
    //   this.getStateList();
    //  }
    this.labelId =  this._route.snapshot.params["id"];
    this.labelIds = this._route.snapshot.queryParams['labelIds']
    if(!this.labelId && !this.labelIds){
      this.router.navigate(['/client/inbox'])
    }
    }
  
    ngOnInit(): void {
      this.createForm();
      this.getCountryList();
    }
  
  
    createForm() {
      this.accountInfoForm = this._formBuilder.group({
        name: ['', [ValidatorsService.required,ValidatorsService.nameValidator]],
        companyName: ['', []],
        address1: ['', [ValidatorsService.required]],
        city: ['', [ValidatorsService.required]],
        state: ['', [ValidatorsService.selectRequired]],
        country: ['', [ValidatorsService.selectRequired]],
        zipCode: ['', [ValidatorsService.required,ValidatorsService.specailCharacter, ValidatorsService.maxZip]],
        phoneNo:['',[ValidatorsService.required,ValidatorsService.phoneNumberValidator]]
      })
    }
      
    selectCountryName(event: any) {
      this.accountInfoForm.controls['state'].reset();
      this.accountInfoForm.controls['city'].reset();
      this.getStateList();
    }
    selectStateName(event: any) {
      this.accountInfoForm.controls['city'].reset();
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
    submit() {
      if (this.accountInfoForm.invalid) {
        this.accountInfoForm.markAllAsTouched();
        return
      }
      if (this.accountInfoForm.valid) {
        let data:any=this.accountInfoForm.value
        this.isLoading = true
        if(this.labelId){
          this._apiService.forwardMail(this.labelId, data).pipe(
            catchError((error) => {
              error ? this.isLoading = false : ''
              this._toasterService.errorToast(error?.message);
              return EMPTY;
            }), take(1)).subscribe((res: any) => {
            if (res.isSuccess) {
                this.router.navigate(['/client/forwarmailsubmit'])
             this.isLoading= false
            }else{
              this.isLoading= false
            }
          })
      
        }else{
          data.labelIds = this.labelIds
          data.type= "create",
          this._apiService.forwardMultipleMail(data).pipe(
            catchError((error) => {
              error ? this.isLoading = false : ''
              this._toasterService.errorToast(error?.message);
              return EMPTY;
            }), take(1)).subscribe((res: any) => {
            if (res.isSuccess) {
                this.router.navigate(['/client/forwarmailsubmit'])
             this.isLoading= false
            }else{
              this.isLoading= false
            }
          })
        }
      }

    }

    goback(){
      this.location.back();
    }

    ngOnDestroy() {
      if (this.accountInfoSub) this.accountInfoSub.unsubscribe();
    }
  
  }
  
