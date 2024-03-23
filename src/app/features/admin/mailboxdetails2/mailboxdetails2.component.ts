import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-mailboxdetails2',
  templateUrl: './mailboxdetails2.component.html',
  styleUrls: ['./mailboxdetails2.component.css']
})
export class Mailboxdetails2Component implements OnInit {
  labelId = "";
  forwardRequestDetail: any;
  shipmentDate: any;
  trackingNo: any;
  isLoading: boolean = false;
  form!: FormGroup;
  minDate = new Date();
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private location: Location,
    private _toasterService: ToasterService,
    private _apiService: ApiService
  ) {
    this.labelId = this._route.snapshot.params['id'];

  }

  ngOnInit(): void {
    this.getLabelDetail();
    this.createForm();
  }
  createForm() {
    this.form = this._fb.group({
      fiveToSevenDays: ['',ValidatorsService.required ],
      threeToFourDays: ['', ],
      twoToThreeDays: ['', ],
      oneDayDays: ['', ],
      SameDayDelivery: ['', ],
    })
  }
  getLabelDetail() {
    this.isLoading = true;
    this._apiService.getLabelDetail(this.labelId).subscribe(res => {

      if (res?.isSuccess) {
        this.forwardRequestDetail = res?.data;
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    })
  }
  enterDetails(){
    if(this.shipmentDate){
      this.isLoading=true
      let data={
        forwardLabelTrackingNumber:this.trackingNo,
        forwardLabelDeliveryDate:this.shipmentDate
      }
      this._apiService.addShipmentDateForForwardLabel(this.labelId,data).subscribe(res=>{
        if(res?.isSuccess){
          this._toasterService.successToast('shipment date send to user successfully');
          this.getLabelDetail();
          this.isLoading=false
        }else{
          this._toasterService.errorToast('shipment date send to user failed');
          this.isLoading=false
        }
      })
    }else{
      alert('please enter shipment date')
    }
  }
  submit() {
    // if (this.form?.value?.fiveToSevenDays || 
    //   this.form?.value?.threeToFourDays|| 
    //   this.form?.value?.twoToThreeDays|| 
    //   this.form?.value?.oneDayDays||
    //   this.form?.value?.SameDayDelivery) {
    //   this.form.markAllAsTouched();
    //   return
    // }
    if (this.form.valid) {
      let data = {
        forwardMailCharges: this.form.value
      }
      this.isLoading = true;
this._apiService.updateForwardQuots(data, this.labelId).subscribe(res=>{
  if(res?.isSuccess){
    this.isLoading = false;
    this._toasterService.successToast('Price updated successfully');
    // this._router.navigate(['/admin/mailbox/mailboxdetail/' + this.labelId])
    this.location.back()
  }else{
    this.isLoading = false;
  }
})
    }else{
      // alert('Please enter at least one price')
      this.form.markAllAsTouched();
      alert('Please enter 5-7 days price');
    }
  }


  back(){
    this.location.back();
  }

  getName(data:any){
    switch (data) {
      case 'fiveToSevenDays': return '5-7 days';
      case 'threeToFourDays': return '3-4 days';
      case 'twoToThreeDays': return '2-3 days';
      case 'oneDayDays': return '1 day';
      case 'SameDayDelivery': return 'same day delivery';
      default: return '';
    }
  }



}
