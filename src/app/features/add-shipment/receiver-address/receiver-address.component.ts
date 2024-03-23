import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { User_Role } from 'src/app/share/enums/userRoles';

@Component({
  selector: 'app-receiver-address',
  templateUrl: './receiver-address.component.html',
  styleUrls: ['./receiver-address.component.css']
})
export class ReceiverAddressComponent implements OnInit {
  verify = false;
  shipDate: any;
  shipmentId:any;
  userRole:any
  addressType:string = 'receiver'
  senderAddressFormSub!: Subscription;
  next = '/client/add-shipment/pakage-info';
  back = '/client/add-shipment/sender-address';
  constructor(
    private _router: Router,
    private location: Location,
    private _authService: AuthService,
  ) {
    // let date = new Date();
    // this.shipDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.shipmentId = localStorage.getItem('shipmentId');
    if(!this.shipmentId){
      this.location.back();
     }

     let userData = this._authService.getUserProfile();
    this.userRole = userData?.role
    if (this.userRole?.code === User_Role.ADMIN) {
      this.next = '/admin/add-shipment/pakage-info';
      this.back = '/admin/add-shipment/sender-address';
    } else if (this.userRole?.code === User_Role.USER) {
      this. next = '/client/add-shipment/pakage-info';
      this.back = '/client/add-shipment/sender-address';
      
    }
  }

  ngOnInit(): void {
  }
  verifyAddress(event:any){

  }
}
