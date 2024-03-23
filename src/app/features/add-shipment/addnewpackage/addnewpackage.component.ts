import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-addnewpackage',
  templateUrl: './addnewpackage.component.html',
  styleUrls: ['./addnewpackage.component.css']
})
export class AddnewpackageComponent implements OnInit {
  PackegeInfoForm!: FormGroup;
  isloading:boolean = false;
  packageDetail:any = [];
  userId:any
  packageslist = [
    {
      "package_type": "YOUR_PACKAGING",
      "package_name": "Your Packaging",
      "enumeration": "Customer Packaging, FedEx Express® Services",
      "max_weight_kg": 68,
      "max_weight_lbs": 150

    },
    // {
    //   "package_type": "YOUR_PACKAGING",
    //   "package_name": "YOUR_PACKAGING",
    //   "enumeration": "Customer Packaging, FedEx Ground® Economy (Formerly known as FedEx SmartPost®) Services",
    //   "max_weight_kg": 32,
    //   "max_weight_lbs": 70
    // },
    {
      "package_type": "FEDEX_ENVELOPE",
      "package_name": " FedEx Envelope",
      "enumeration": "FedEx® Letters",
      "max_weight_kg": 0.5,
      "max_weight_lbs": 1
    },
    // {
    //   "package_type": "FEDEX_BOX",
    //   "package_name": "FEDEX_BOX (max_weight 9 kg/20 lbs)",
    //   "enumeration": "FedEx® Box",
    //   "max_weight_kg": 9,
    //   "max_weight_lbs": 20
    // },
    {
      "package_type": "FEDEX_SMALL_BOX",
      "package_name": "FedEx Small Box",
      "enumeration": "FedEx® Small Box",
      "max_weight_kg": 9,
      "max_weight_lbs": 20
    },
    {
      "package_type": "FEDEX_MEDIUM_BOX",
      "package_name": "FedEx Medium Box ",
      "enumeration": "FedEx® Medium Box",
      "max_weight_kg": 9,
      "max_weight_lbs": 20
    },
    {
      "package_type": "FEDEX_LARGE_BOX",
      "package_name": "FedEx Large Box ",
      "enumeration": "FedEx® Large Box",
      "max_weight_kg": 9,
      "max_weight_lbs": 20
    },
    {
      "package_type": "FEDEX_EXTRA_LARGE_BOX",
      "package_name": "FedEx Extra Large Box ",
      "enumeration": "FedEx® Extra Large Box",
      "max_weight_kg": 9,
      "max_weight_lbs": 20
    },
    // {
    //   "package_type": "FEDEX_10KG_BOX",
    //   "package_name": "FEDEX_10KG_BOX ( max_weight 10 kg/22 lbs)",
    //   "enumeration": "FedEx® 10kg Box",
    //   "max_weight_kg": 10,
    //   "max_weight_lbs": 22
    // },
    // {
    //   "package_type": "FEDEX_25KG_BOX",
    //   "package_name": "FEDEX_25KG_BOX ( max_weight 25 kg/55 lbs)",
    //   "enumeration": "FedEx® 25kg Box",
    //   "max_weight_kg": 25,
    //   "max_weight_lbs": 55
    // },
    {
      "package_type": "FEDEX_PAK",
      "package_name": "FedEx Pak ",
      "enumeration": "FedEx® Pak",
      "max_weight_kg": 9,
      "max_weight_lbs": 20
    },
    {
      "package_type": "FEDEX_TUBE",
      "package_name": "FedEx Tube",
      "enumeration": "FedEx® Tube",
      "max_weight_kg": 9,
      "max_weight_lbs": 20
    }
  ]
  packageDimensions = [
    { PackageType: 'FEDEX_ENVELOPE', inch: { length: '0', height: '', width: '0' }, cm: { length: '0', height: '', width: '0' } },
    { PackageType: 'FEDEX_SMALL_BOX', inch: { length: '8.75', height: '2.69', width: '11.45' }, cm: { length: '22.23 ', height: '6.83 ', width: '28.73' } },
    { PackageType: 'FEDEX_MEDIUM_BOX', inch: { length: '8.75', height: '4.38', width: '11.45' }, cm: { length: '22.23 ', height: '11.11 ', width: '28.73' } },
    { PackageType: 'FEDEX_LARGE_BOX', inch: { length: '9.5', height: '7.75', width: '15.5' }, cm: { length: '22.23 ', height: '19.69', width: '28.73' } },
    { PackageType: 'FEDEX_EXTRA_LARGE_BOX', inch: { length: '11.88', height: '10.81', width: '11.06' }, cm: { length: '30.16', height: '27.46', width: '28.10' } },
    { PackageType: 'FEDEX_PAK', inch: { length: '0', height: '', width: '0' }, cm: { length: '0', height: '', width: '0' } },
    { PackageType: 'FEDEX_TUBE', inch: { length: '6', height: '6', width: '38' }, cm: { length: '15.24', height: '15.24', width: '96.52 ' } },
  ]
  packageId!: string;
  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    private _router: Router,
    private _authServices: AuthService,
  ) {

    this.packageId = this._route.snapshot.params["id"];
    this.userId = this._authServices.getUserId();
  }

  ngOnInit(): void {
    if (this.packageId) {
      this.isloading = true;
      this._apiService.getPackageDetail(this.packageId).subscribe(data => {
        if (data.isSuccess) {
            this.packageDetail = data?.data
            this.PackegeInfoForm.patchValue(this.packageDetail);
            this.isloading = false;
            if (this.packageDetail?.packageType !== 'YOUR_PACKAGING') {
              let data  = this.PackegeInfoForm?.get('dimension');
                          
              // this.PackegeInfoForm?.controls['dimension'].disable()
              let item:any =  this.PackegeInfoForm?.controls['dimension']
              let item1 =  this.PackegeInfoForm?.controls['dimension'].value?.unit;
              item?.controls['length'].disable()
              item?.controls['width'].disable()
              item?.controls['height'].disable()


              // console.log('item controls',item?.controls)
      
              // this.PackegeInfoForm?.controls['dimension']?.unit.enable()
              // item?.length?.disable();
              // item?.width?.disable();
            }
        } else {
          this.isloading = false;
        }
      })
    } else {
    }
    this.createForm();
  }

  createForm() {
    this.PackegeInfoForm = this._fb.group({
          packageName: ['', [ValidatorsService.required, ValidatorsService.nameValidator]],
          packageType: ['', ValidatorsService.selectRequired],
          weightUnits: ['LB', ValidatorsService.selectRequired],
          weight: ['', ValidatorsService.required,],
          dimension: this._fb.group({
            unit: ['IN', ValidatorsService.selectRequired],
            // length: [{ value: '', disabled: this.PackegeInfoForm?.controls['packageType'].value!=='YOUR_PACKAGING' }, ValidatorsService.required],
            // width: [ { value: '', disabled: this.PackegeInfoForm?.controls['packageType'].value!=='YOUR_PACKAGING' },ValidatorsService.required],
            // height: [{ value: '', disabled: this.PackegeInfoForm?.controls['packageType'].value!=='YOUR_PACKAGING' }, ValidatorsService.required],
            length: ['', ValidatorsService.required],
            width: [ '', ValidatorsService.required],
            height: ['', ValidatorsService.required],
          }),
          insuranceDeclared: [''],
          contentDescription: ['', ],
      // [disabled]="this.packageDetail?.packageType !=='YOUR_PACKAGING'"
    })
  }

  addPackage(){
    if (this.PackegeInfoForm.invalid) {
      this.PackegeInfoForm.markAllAsTouched();
      return
    }
    if (this.PackegeInfoForm.valid) {
      let data = this.PackegeInfoForm.getRawValue();
      this.isloading = true;
      if(this.packageId){
        this._apiService.updatePackageDetail(this.packageId,data).subscribe(res => {
          if (res.isSuccess) {
            this._router.navigate(['/client/packages']);
            this.isloading = false;
          } else {
            this.isloading = false;
           }
        })
      }else{
        data.createdBy =this.userId
        this._apiService.addPackageDetail(data).subscribe(res => {
          if (res.isSuccess) {
          this._router.navigate(['/client/packages']);
          this.isloading = false;
        } else {
          this.isloading = false;
         }
      })
    }
      // routerLink="/client/add-shipment/arrival-pref"
    }

  }
  selectPackage(event: any,data:any){
    let value = event.value;
   let item =  data?.controls

    if (value == 'FEDEX_ENVELOPE' || value == 'FEDEX_PAK') {
      item?.height?.clearValidators();
      item?.height?.updateValueAndValidity();
    } else {
      item?.height?.setValidators(ValidatorsService.required);
      item?.height?.updateValueAndValidity();
    }

    let packageInfo = this.packageDimensions.filter(e => e.PackageType == value);
    item?.height?.setValue(packageInfo[0]?.inch?.height);
    item?.length?.setValue(packageInfo[0]?.inch?.length);
    item?.width?.setValue(packageInfo[0]?.inch?.width);
    if (value !== 'YOUR_PACKAGING') {
      item?.height?.disable();
      item?.length?.disable();
      item?.width?.disable();
      item?.height?.setValidators(ValidatorsService.required);
      item?.height?.updateValueAndValidity();
      item?.length?.setValidators(ValidatorsService.required);
      item?.length?.updateValueAndValidity();
      item?.width?.setValidators(ValidatorsService.required);
      item?.width?.updateValueAndValidity();
    //   let data = this.PackegeInfoForm.getRawValue();

    } else {
      item?.height?.enable();
      item?.length?.enable();
      item?.width?.enable();
      item?.height?.clearValidators();
      item?.height?.updateValueAndValidity();
      item?.length?.clearValidators();
      item?.length?.updateValueAndValidity();
      item?.width?.clearValidators();
      item?.width?.updateValueAndValidity();
    }
  }
  changeDimensionUnit(event: any,data:any) {
    let item =  data?.controls
    let dimensionUnit = event.value;
    let packageInfo = this.packageDimensions.filter(e => e.PackageType == this.PackegeInfoForm.controls['packageType'].value);
    if (dimensionUnit == 'CM') {
      this.PackegeInfoForm.controls['dimension']
      item?.height?.setValue(packageInfo[0]?.cm?.height);
      item?.length?.setValue(packageInfo[0]?.cm?.length);
      item?.width?.setValue(packageInfo[0]?.cm?.width);

    } else {
      item?.height?.setValue(packageInfo[0]?.inch?.height);
      item?.length?.setValue(packageInfo[0]?.inch?.length);
      item?.width?.setValue(packageInfo[0]?.inch?.width);
    }

  }



}
