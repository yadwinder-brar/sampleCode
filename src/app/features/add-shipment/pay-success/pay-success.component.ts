import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError, take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { User_Role } from 'src/app/share/enums/userRoles';
@Component({
  selector: 'app-pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.css']
})
export class PaySuccessComponent implements OnInit {
  shipmentId: any;
  userRole: any;
  dialogResult: boolean = false;
  isPaymentComplete: boolean = false;
  // dialogResult:any;
  isloading: boolean = false;
  constructor(
    private _authService: AuthService,
    private _apiService: ApiService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _toasterService: ToasterService
  ) {

    let userData = this._authService.getUserProfile();
    this.userRole = userData?.role
    let data = this._activatedRoute.snapshot.params["id"];
    let sessionId = this._activatedRoute.snapshot.queryParamMap.get('sessionId');
    if (!data && !sessionId) {
      if (this.userRole?.code === User_Role.ADMIN) {
        this._router.navigate(['/admin/shipments']);
      } else if (this.userRole?.code === User_Role.USER) {
        this._router.navigate(['/client/shipments']);

      }
    }
    if (sessionId) {
      this.shipmentId = localStorage.getItem('shipId');
      this.shipmentPaymentVerification(sessionId, this.shipmentId);
    } else {
      let data = this._activatedRoute.snapshot.params["id"]
      localStorage.setItem('shipId', data);
    }

  }

  ngOnInit(): void {
    localStorage.removeItem('shipmentId');
    this.shipmentId = localStorage.getItem('shipId');
  }

  paymentDone() {
    let data = {
      shipmentId: this.shipmentId
    }
    this.isloading = true;
    this._apiService.paymentShipment(data).subscribe(res => {
      if (res.isSuccess) {
        let a = document.createElement('a');
        a.href = `${res?.data}`;
        a.click();
        // this.isloading = false;
      } else {
        this.isloading = false;
      }
    })
  }
  shipmentPaymentVerification(id: any, shipmentId: any) {
    let data = {
      url: id,
      shipmentId: shipmentId,
    }
    this.isloading = true;
    this._apiService.shipmentPaymentVerification(data).subscribe(res => {
      if (res?.isSuccess && res?.data) {
        this.isPaymentComplete = res?.data?.isPaymentComplete;
        // this.completeShipment();
        // this._authService.storeUserProfile(res?.data);
        // this.isloading = false;
        if (this.isPaymentComplete) {
          if (this.userRole?.code === User_Role.ADMIN) {
            this._router.navigate(['/admin/shipments/shipment-detail/' + this.shipmentId]);
          } else if (this.userRole?.code === User_Role.USER) {
            this._router.navigate(['/client/shipments/shipment-detail/' + this.shipmentId]);

          }
        } else {
         
        }
      } else {
        // if (this.userRole?.code === User_Role.ADMIN) {
        //   this._router.navigate(['/admin']);
        // } else if (this.userRole?.code === User_Role.USER) {
        //   this._router.navigate(['/client']);

        // }
        this.isloading = false;

        this._toasterService.errorToast('payment failed please try again');
      }
    })
  }

  canDeactivate(): Observable<boolean> {
    // this.dialog
    //       .open(ConfirmationComponent, {
    //         maxWidth: '500px',
    //         minWidth: '500px',
    //         panelClass: 'dailogClass',
    //         data: {
    //           title: '',
    //           panelClass: 'dailogClass',
    //           description: 'Payment is not completed yet ,Are you sure to want go back.It will cancel your shipment',
    //         },
    //       })
    //       const result=   data.afterClosed().pipe(
    //         map(result => result === true)
    //       );    
    if (!this.isPaymentComplete) {

      const result = window.confirm('Payment is not completed yet ,Are you sure to want go back.It will cancel your shipment');
      if (result) {
        this.cancelShipment();
      }
      return of(result);
    }


    return of(true)
  }
  // return of(true);

  // const result = this.dialogResult
  // return of (result);

  cancelShipment() {
    this.isloading= true;
    this._apiService.DeleteCancelShipment(this.shipmentId).pipe(
      catchError((error) => {
        error?this.isloading = false:''
        this._toasterService.errorToast(error?.message);
        return EMPTY;
      }),take(1)
    ).subscribe(res => {
      if(res.isSuccess){
        if (this.userRole?.code === User_Role.ADMIN) {
          this._router.navigate(['/admin']);
          this.isloading= false;
        } else if (this.userRole?.code === User_Role.USER) {
          this._router.navigate(['/client']);
          this.isloading= false;
        }
        this.isloading = false;
      }else{
        this.isloading= false;
      }
    })
  }

  //   ngOnDestroy() {
  //   this.cancleShipment();
  // }

}


