import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcountTypeService } from '../../services/acount-type.service';
import { LocalStorage } from 'src/app/core/config';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-accout-type',
  templateUrl: './accout-type.component.html',
  styleUrls: ['./accout-type.component.css']
})
export class AccoutTypeComponent implements OnInit {
  isShipment: boolean = true;
  acountType: string = ''
  shipmentAccount:boolean=false
  mailBoxAccount:boolean=false
  constructor(private router: Router,
     private _acount : AcountTypeService,
     private _toasterService : ToasterService,
     ) { 
    let accountType = localStorage.getItem('accountType');
    this.acountType = accountType?accountType :'shipment';
this.shipmentAccount = accountType == 'both'|| accountType == 'shipment'? true:false;
this.mailBoxAccount = accountType == 'both'|| accountType == 'virtualMailBox'? true:false;

  }

  ngOnInit(): void {
    this._acount.accountType$.subscribe(data => {
      this.acountType = data ? data : this.acountType;
    })
  }
  // accountType(e: any) {
  //   if (e.checked == true) {
  //     this.acountType = "both"
  //     this._acount.setAccountType(this.acountType);
  //   } else {
  //     this.acountType = "shipment"
  //     this._acount.setAccountType(this.acountType);
  //   }
  // }
  selectShipmentAccount(event:any){
    this.shipmentAccount = event?.checked;
  }
  selectMailboxAccount(event:any){
    this.mailBoxAccount = event?.checked
  }
  next() {
    if(this.shipmentAccount == false && this.mailBoxAccount == false){
      this._toasterService.warningToast('Please select atleast one account type');
      return
    }
if(this.shipmentAccount && this.mailBoxAccount){
  this.acountType = 'both'
}else if(this.shipmentAccount == true && this.mailBoxAccount == false){
  this.acountType = 'shipment'
}
else if(this.shipmentAccount == false && this.mailBoxAccount == true){
  this.acountType = 'virtualMailBox'
}

    localStorage.setItem('accountType', this.acountType)
    this.router.navigate(['/account-info'])
  }

}
