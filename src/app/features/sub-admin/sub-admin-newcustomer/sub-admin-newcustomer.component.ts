import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-sub-admin-newcustomer',
  templateUrl: './sub-admin-newcustomer.component.html',
  styleUrls: ['./sub-admin-newcustomer.component.css']
})
export class SubAdminNewcustomerComponent implements OnInit {


   isLoading:boolean=false;
   form!: FormGroup;
   countries: any = [];
   states: any = [];
   mask = '(000) 000-0000';
    constructor(
      private _fb: FormBuilder,
      private _router: Router,
      private _apiService: ApiService,
      private _toasterService: ToasterService,
    ) { }
  
    ngOnInit(): void {
      this.createForm();
      this.getCountryList();
      this.getStateList();
    }
  
  createForm(){
  
      this.form = this._fb.group({
        name: ['', [ValidatorsService.required]],
        email: ['', [ValidatorsService.required, ValidatorsService.emailValidator]],
        companyName: [''],
        phone: ['', [ValidatorsService.required]],
        address1: ['', [ValidatorsService.required]],
        address2: [''],
        accountType:['virtualMailBox'],
        city: ['', [ValidatorsService.required]],
        state: ['', [ValidatorsService.selectRequired]],
        country: ['', [ValidatorsService.selectRequired]],
        zipCode: ['', [ValidatorsService.required,ValidatorsService.specailCharacter, ValidatorsService.maxZip]],
      })
  
  }
  
  getCountryList() {
  this._apiService.getCountryList().subscribe(res => {
      if (res.isSuccess) {
        this.countries = res.items.filter((e: any) => e.name == "United States of America")
      }
    });
  }
  selectCountryName(event: any) {
    this.form.controls['state'].reset();
    // let data = this.countries.filter((e: any) => e.name = event.value);
    // this.form.controls['countryShortCode'].setValue(data[0].code);
    this.getStateList();
  }
  
  getStateList() {
    let data = {
      country: this.form.controls['country'].value
    }
  this._apiService.getStateList(data).subscribe(res => {
      if (res.isSuccess) {
        this.states = res.items
      }
    })
  }
  

submit(){
  if(this.form.invalid){
    this.form.markAllAsTouched();
    return
  }
  if(this.form.valid){
    this.isLoading = true;
    this._apiService.addUser(this.form.value).subscribe(res=>{
      if(res?.isSuccess){
        this._toasterService.successToast('Customer added successfully')
        this._router.navigate(['/subAdmin/customerlist']);
        this.isLoading = false
      }else{
        this.isLoading = false
      }
    })
  }
}}