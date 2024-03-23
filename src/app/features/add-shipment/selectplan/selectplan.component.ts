import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, ApiService } from 'src/app/core/services';
import { Location } from '@angular/common';
@Component({
  selector: 'app-selectplan',
  templateUrl: './selectplan.component.html',
  styleUrls: ['./selectplan.component.css']
})
export class SelectplanComponent implements OnInit {
  selectedPlan: string = '';
  plainId: string = '';
  isloading: boolean = false;
  userId: any;
  planType: string = 'monthly';
  PlansData: any = [];
  userData: any;
  constructor(
    private location: Location,
    private _apiServices: ApiService,
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.userData = this._authService.getUserProfile();
    this.userId = this.userData?.id
    this.plainId = this._authService.getPlainId();
    let sessionId = this._activatedRoute.snapshot.queryParamMap.get('sessionId');
    if (sessionId) {
      // this.paymentVerification(sessionId, this.userId);
      // paymentVerification(sessionId: any, userId: any) {
      let data = {
        // url: id,
        // userId: userId,
        url: sessionId,
        userId: this.userId,
        planId: this.plainId
      }
      this.isloading = true;
      this._apiServices.paymentVerification(data).subscribe(res => {
        if (res?.isSuccess && res?.data) {
          this._authService.storeUserProfile(res?.data);
          if(res?.data?.isTopUp){
            this._router.navigate(['/client/account-settings'], { queryParams: { tab: 'mailboxPlan' } })
          }
          else{
            this._router.navigate(['client/mailbox-dashboard']);
          }
          
          // this.isloading = false;
        } else {
          this.isloading = false;  
        }
      })
    }
    // }
    if(this.userData?.isPlanPurchased){
      this.planType = 'topUp'
    }

  }

  ngOnInit(): void {
    this.getPlans();
  }
  storePlanId(id: any) {
    this.selectedPlan = id
    this._authService.storePlanId(this.selectedPlan)
  }
  // paymentVerification(id: any, userId: any) {
  //   let data = {
  //     url: id,
  //     userId: userId,
  //     planId: this.plainId
  //   }
  //   this.isloading = true;
  //   this._apiServices.paymentVerification(data).subscribe(res => {
  //     if (res?.isSuccess && res?.data) {
  //       this._authService.storeUserProfile(res?.data);
  //       this._router.navigate(['client/mailbox-dashboard']);
  //       // this.isloading = false;
  //     } else {
  //       this.isloading = false;
  //     }
  //   })
  // }
  getPlans() {
    this.isloading = true;
    let data = this.planType
    this._apiServices.getMailBoxPlans(data).subscribe(res => {
      if (res.isSuccess) {
        this.PlansData = res?.items;
        this.isloading = false;
      } else {
        this.isloading = false;
      }
    })
  }
  buyPlan() {
    let data = {
      "userId": this.userId,
      "planId": this.selectedPlan
    }
    if (this.selectedPlan !== '') {
      this.isloading = true;
      this._apiServices.buyMailBoxPlans(data).subscribe(res => {
        if (res?.isSuccess) {
          // this._router.navigate(['client/mailbox-dashboard']);
          let a = document.createElement('a');
          a.href = `${res?.data}`;
          a.click();
          this.isloading = false;
          // this._router.navigate([]);
          // this._router.navigate(['client/mailbox-dashboard']);
        } else {
          this.isloading = false;
        }
      })
    } else {
      alert('Please select plan');
    }
  }
  cancel() {
    let userProfile = this.userData.profiles.filter((e: any) => e.accountType == 'virtualMailBox');
    let shipmentProfile = this.userData.profiles.filter((e: any) => e.accountType == 'shipment');
    if (this.userData?.isPlanExist) {
      // this._router.navigate(['client/mailbox-dashboard']);
      this.location.back()
    } else {
      if (shipmentProfile) {
        this._router.navigate(['/client/dashboard']);

      } else {
        this._router.navigate(['client/mailbox-dashboard']);
      }
    }

  }

  planTypeChange(event: any) {
   this.getPlans();
  }

}
