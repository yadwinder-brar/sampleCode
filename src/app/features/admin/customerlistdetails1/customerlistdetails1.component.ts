import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-customerlistdetails1',
  templateUrl: './customerlistdetails1.component.html',
  styleUrls: ['./customerlistdetails1.component.css']
})
export class Customerlistdetails1Component implements OnInit {
  shipmentId: string = '';
  shipmentDetail: any;
  link: any;
  custmerId: any
  updatedData: any;
  constructor(
    private _route: ActivatedRoute,
    private _apiServices: ApiService,
  ) {

    this.shipmentId = this._route.snapshot.params["id"];
  }

  ngOnInit(): void {
    if (this.shipmentId) {
      this._apiServices.getShipmentDetail(this.shipmentId).subscribe(res => {
        if (res.isSuccess) {
          this.shipmentDetail = res.data;
          this.custmerId = this.shipmentDetail?.createdBy?.id
          let data = this.shipmentDetail?.serviceQuote;
          this.link = '/admin/customerlist/customer-detail/' + this.custmerId
          this.updatedData = data?.reduce(
            (obj: any, item: any) => Object.assign({ ...obj, [item.name]: item.value }), {});
        }
      })
    }
  }

}
