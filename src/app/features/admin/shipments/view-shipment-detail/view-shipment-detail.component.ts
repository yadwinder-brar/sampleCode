  import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { ApiService } from 'src/app/core/services/api.service';
  
  @Component({
    selector: 'app-view-shipment-detail',
    templateUrl: './view-shipment-detail.component.html',
    styleUrls: ['./view-shipment-detail.component.css']
  })
  export class ViewShipmentDetailComponent implements OnInit {
    shipmentId:string = '';
    shipmentDetail:any;
    updatedData:any;
  //   @ViewChild("mainContent")
  // private mainContentDiv!: ElementRef<HTMLElement>;
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
  
