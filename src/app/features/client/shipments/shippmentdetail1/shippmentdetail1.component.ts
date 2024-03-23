import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-shippmentdetail1',
  templateUrl: './shippmentdetail1.component.html',
  styleUrls: ['./shippmentdetail1.component.css']
})
export class Shippmentdetail1Component implements OnInit {
  shipmentId:string = '';
  shipmentDetail:any;
  updatedData:any;
  constructor(
    private _route:ActivatedRoute,
    private _apiServices:ApiService,
  ) { 

    this.shipmentId = this._route.snapshot.params["id"];
  }

  ngOnInit(): void {
    if(this.shipmentId){
      this._apiServices.getShipmentDetail(this.shipmentId).subscribe(res=>{
         if(res.isSuccess){
          this.shipmentDetail = res.data;
          let data = this.shipmentDetail?.serviceQuote;

          this.updatedData = data?.reduce(
            (obj: any, item: any) => Object.assign({ ...obj, [item.name]: item.value }), {});
          }
      })
    }
  }

}
