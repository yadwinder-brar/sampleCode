import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { LabelDialogComponent } from '../../../labelDialog/label-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-shipment-detail',
  templateUrl: './shipment-detail.component.html',
  styleUrls: ['./shipment-detail.component.css']
})
export class ShipmentDetailComponent implements OnInit {
  shipmentId: string = '';
  shipmentDetail: any;
  trackingNo:any
  url:any = [];
  constructor(
    private _route: ActivatedRoute,
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private _apiServices: ApiService,
    private _toasterService: ToasterService,
  ) {

    this.shipmentId = this._route.snapshot.params["id"];
  }

  ngOnInit(): void {
    if (this.shipmentId) {
      this._apiServices.getShipmentDetail(this.shipmentId).subscribe(res => {
        if (res.isSuccess) {
          this.shipmentDetail = res?.data
        }
        else {
        }
      })
    }
  }

  copyAsnewShipment() {
    // api for copy shipment
  }

copyTrackingNo(){
  if(this.trackingNo){
    this.clipboard.copy(this.trackingNo);
    this._toasterService.successToast('Tracking number copied');
  }else{
  this._apiServices.printLabel(this.shipmentId).subscribe(res => {
    if (res.isSuccess) {
      this.trackingNo = res?.data?.trackingNumber;
      this.clipboard.copy(this.trackingNo);
      this._toasterService.successToast('Tracking number copied')
    }
  })
}
}  
  printLabel() {
    this._apiServices.printLabel(this.shipmentId).subscribe(res => {
      if (res.isSuccess) {
        this.url = res?.data?.labelUrl;
        this.trackingNo = res?.data?.trackingNumber;
        if (this.url &&  this.url.length>1) {
       this.dialog.open(LabelDialogComponent, {
            width: '40%',
            height: '350px',
            panelClass: 'upload',
            data:{data:this.url ,shipmentId: this.shipmentId}
          })


        } else {
window.open( this.url)
        }

      }
    })
  }
  copyShipment() {
    let data={
      shipmentId:this.shipmentId
    }
    this._apiServices.copyShipment(data).subscribe(res => {
      if(res.isSuccess){
      this._toasterService.successToast('shipment copy successfuly')
      }
    })
  }

  mailTo(){
    if(this.trackingNo && this.url){
      let mailText ="mailto:''?subject=Shipment details&body=" +'Tracking No.=' +this.trackingNo + '%0D%0A' + 'Label:'+this.url;
      window.location.href = mailText
    }else{
      this._apiServices.printLabel(this.shipmentId).subscribe(res => {
        if (res.isSuccess) {
          this.url = res?.data?.labelUrl;
          this.trackingNo = res?.data?.trackingNumber;
          let mailText ="mailto:''?subject=Shipment details &body=" +'Tracking No.=' +this.trackingNo+ '%0D%0A'+ 'Label:'+this.url;
          // let mailText ="mailto:''?subject=Shipment details &body=" +'Tracking No.=' +this.trackingNo+ '   '+ 'label is :'  +this.url;
          window.location.href = mailText
  
        }
      })
    }
  }

}