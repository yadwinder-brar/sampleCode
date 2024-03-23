import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services';
import { Location } from '@angular/common';
@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {
  shipmentId: any;
  shipmentInfo: any;
  updatedData: any = [];
  isloading: boolean = false
  packageDetail: any
  constructor(
    private _router: Router,
    private _apiService: ApiService,
    private location: Location
  ) {
    this.shipmentId = localStorage.getItem('shipmentId');
    if (!this.shipmentId) {
      this.location.back();
    }
  }

  ngOnInit(): void {
    if (this.shipmentId) {
      this._apiService.getShipmentDetail(this.shipmentId).subscribe(res => {
        if (res.isSuccess) {
          this.shipmentInfo = res.data;
          // let packageInfo = this.shipmentInfo?.packages;

          // this.packageDetail = packageInfo.map((e:any)=>e.dimension)
        }
      })
    } else {
      // this.location.back();
    }
  }
  updateQuotes() {
    let data = ''
    this.isloading = true
    this._apiService.updateQuotes(data, this.shipmentId).subscribe(res => {
      if (res.isSuccess) {
        let item = res?.data?.serviceQuote;
        this.updatedData = item
        //     this.updatedData = item?.reduce(
        //       (obj: any, item: any) => Object.assign({ ...obj, [item.name]: item.value }), {});
        this.isloading = false;
      } else {
        this.isloading = false;
      }
    })
  }

}
