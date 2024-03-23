import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, ToasterService } from 'src/app/core/services';

@Component({
  selector: 'app-forwardmaillast',
  templateUrl: './forwardmaillast.component.html',
  styleUrls: ['./forwardmaillast.component.css']
})
export class ForwardmaillastComponent implements OnInit {
  labelId: any;
  isLoading: boolean = false;
  forwardRequestDetail: any;
  selectedPlan: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _apiService: ApiService,
    private _toasterServices: ToasterService,
    private _activatedRoute: ActivatedRoute
  ) {

    this.labelId = this._route.snapshot.params["id"];
    let sessionId = this._activatedRoute.snapshot.queryParamMap.get('sessionId');
      if(sessionId){
        this.PaymentStatus(sessionId);
      }

  }
  PaymentStatus(sessionId:string){
    this.isLoading = true;
    let data = {
      url:sessionId
    }
    this._apiService.ForwardLabelPayment(data).subscribe(res=>{
      if(res?.isSuccess){
        this._toasterServices.successToast('Payment Successful');
        this._router.navigate(['/client/archive']);
        this.isLoading = false;
      }else{
        this.isLoading = false;
        this._toasterServices.errorToast('Payment failed')
      }
    })
  }
  ngOnInit(): void {
    if (this.labelId) {
      this.getLabelDetail();
    }
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
  selectDays() {
    if (this.selectedPlan) {
      this.isLoading = true;

      let data = { forwardMailCharges: this.selectedPlan }
      this._apiService.selectForwardPlan(data, this.labelId).subscribe(res => {
        if (res?.isSuccess) {
          // this._toasterServices.successToast('Plan Selected Succesfully');
          // this._router.navigate(['/client/archive']);

          this._apiService.selectForwardPlanPayment(res?.data?._id).subscribe(res => {
            if (res?.isSuccess) {
              let a = document.createElement('a');
              a.href = `${res?.data}`;
              a.click();
              this.isLoading = false
            } else {

              this.isLoading = false
            }
          })
        } else {
          this.isLoading = false
        }
      })


    } else {
      alert('please select shiping charges')
    }
  }
  planSelected(event: any) {
    if (event.value == '1') {
      this.selectedPlan = {
        "name": "fiveToSevenDays",
        "price": this.forwardRequestDetail?.forwardMailCharges?.fiveToSevenDays
      }
    }
    if (event.value == '2') {
      this.selectedPlan = {
        "name": "threeToFourDays",
        "price": this.forwardRequestDetail?.forwardMailCharges?.threeToFourDays
      }
    }
    else if (event.value == '3') {
      this.selectedPlan = {
        "name": "twoToThreeDays",
        "price": this.forwardRequestDetail?.forwardMailCharges?.twoToThreeDays
      }
    }
    else if (event.value == '4') {
      this.selectedPlan = {
        "name": "oneDayDays",
        "price": this.forwardRequestDetail?.forwardMailCharges?.oneDayDays
      }
    }
    else if (event.value == '5') {
      this.selectedPlan = {
        "name": "SameDayDelivery",
        "price": this.forwardRequestDetail?.forwardMailCharges?.SameDayDelivery
      }
    }
  }
}
