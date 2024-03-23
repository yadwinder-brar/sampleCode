import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';



@Component({
  selector: 'app-add-edit-subadmin',
  templateUrl: './add-edit-subadmin.component.html',
  styleUrls: ['./add-edit-subadmin.component.css']
})
export class AddEditSUbadminComponent implements OnInit {
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
      address: ['', [ValidatorsService.required]],
      country: ['', [ValidatorsService.selectRequired]],
      state: ['', [ValidatorsService.required]],
      zipCode: ['', [ValidatorsService.required,ValidatorsService.specailCharacter, ValidatorsService.maxZip]],
      phone: ['', [ValidatorsService.required]],
      countryCode: "+44"
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
  // this._router.navigate(['/admin/subAdmins']);
  if(this.form.invalid){
    this.form.markAllAsTouched();
    return
  }

  if(this.form.valid){
    this.isLoading = true;
    this._apiService.addSubAdmin(this.form.value).subscribe(res=>{
      if(res?.isSuccess){
        this._toasterService.successToast('Sub-Admin added successfully')
        this._router.navigate(['/admin/subAdmins']);
        this.isLoading = false
      }else{
        this.isLoading = false
      }
    })
  }




}


}
