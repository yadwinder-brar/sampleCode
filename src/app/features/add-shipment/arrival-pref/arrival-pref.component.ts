import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, ToasterService } from 'src/app/core/services';
import { AuthService } from 'src/app/core/services/auth.service';
import { User_Role } from 'src/app/share/enums/userRoles';

@Component({
    selector: 'app-arrival-pref',
    templateUrl: './arrival-pref.component.html',
    styleUrls: ['./arrival-pref.component.css']
})
export class ArrivalPrefComponent implements OnInit {
    selectedService: any = [];
    planType = 'fedEx'
    shipmentId: any;
    ShipmentServices: any = [];
    isloading: boolean = false;
    location: any;
    next = '/client/add-shipment/additional-info';
    back = '/client/add-shipment/package-info';
    constructor(
        private authService: AuthService,
        private _apiService: ApiService,
        private _toasterServices: ToasterService,
        private _router:Router
    ) {
        this.ShipmentServices = this.authService.getShipmentServices();
        this.shipmentId = localStorage.getItem('shipmentId');
        if (!this.shipmentId) {
            this.location.back();
        }
        if (this.shipmentId) {
            this.isloading = true;
            this._apiService.getShipmentDetail(this.shipmentId).subscribe(res => {
                if (res.isSuccess && res?.data?.selectedService) {
                    this.selectedService = res.data.selectedService;
                    this.isloading = false;
                }
            })
        } else {
            // this.location.back();
            this.isloading = false;
        }

        let userData = this.authService.getUserProfile();
        let userRole = userData?.role
        if (userRole?.code === User_Role.ADMIN) {
          this.next = '/admin/add-shipment/additional-info';
          this.back = '/admin/add-shipment/pakage-info';
        } else if (userRole?.code === User_Role.USER) {
          this. next = '/client/add-shipment/additional-info';
          this.back = '/client/add-shipment/pakage-info';
        }
    }

    ngOnInit(): void {
    }
    selectService(data: any) {
        this.selectedService = data;
    }
    goBack(){
        this._router.navigate([this.back])
    }
    submit() {
        if (this.selectedService != '') {
            this.isloading = true;
            this._apiService.selectService(this.selectedService, this.shipmentId).subscribe(res => {
             if(res.isSuccess){
                this._router.navigate([this.next]);
                this.isloading = false;
             }else{
                this._toasterServices.errorToast(res?.message)
                this.isloading = false; 
            }
            })

            // routerLink=""
        }
        else {
            this.isloading = false;
        }
    }
    serviceChange(event:any){
debugger
    }
}
