import { Component, OnInit } from '@angular/core';
import { ApiService, AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit {
  userId: any;
  totalRecords: any
  search: string = '';
  MaxDate: any;
  shipmentDate: any = '';
  shipmentStatus: string = ''
  pageNo: number = 1;
  pageSize: number = 10;
  shipmentData: any = [];
  constructor(
    private _apiService: ApiService,
    private _authService: AuthService
  ) {
    this.userId = this._authService.getUserId();
    this.MaxDate = new Date()
  }

  ngOnInit(): void {
    // this.getShipments();
  }
  getShipments() {
    let data = {
      userId: this.userId,
      search: this.search,
      shipmentDate: this.shipmentDate,
      shipmentStatus: this.shipmentStatus,
      pageNo: this.pageNo,
      pageSize: this.pageSize
    }
    this._apiService.getShipments(data).subscribe(res => {
      if (res.isSuccess) {
        this.shipmentData = res.items;
        this.totalRecords = res?.totalRecords
      }
    })
  }
  searchShipment(e:any){
    setTimeout(() =>{
      this.pageNo = 1;
    this.getShipments();
  },1000);
  }

}
