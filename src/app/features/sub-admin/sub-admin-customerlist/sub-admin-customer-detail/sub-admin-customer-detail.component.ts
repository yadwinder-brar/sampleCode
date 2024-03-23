import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services';

@Component({
  selector: 'app-sub-admin-customer-detail',
  templateUrl: './sub-admin-customer-detail.component.html',
  styleUrls: ['./sub-admin-customer-detail.component.css']
})
export class SubAdminCustomerDetailComponent implements OnInit {
  totalRecords: any
  // url: any = environment.apiUrls.baseApiUrl;
  search: string = '';
  shipmentDate: any = '';
  isLoading: boolean = false;
  shipmentStatus: string = ''
  pageNo: number = 1;
  pageSize: number = 10;
  shipmentData: any = [];
  customerId: string = '';
  customerDetail: any = [];
  userProfile: any;
  userDoc: any;

  constructor(private _apiService: ApiService , private _route:ActivatedRoute) { 
    this.customerId = this._route.snapshot.params["id"];
  }

  ngOnInit(): void {
    if (this.customerId) {
      this.getUserDetail();
    }
    // this.getShipments();
  }

  getUserDetail() {
    this.isLoading = true
    this._apiService.getUserDetail(this.customerId).subscribe(res => {
      if (res?.isSuccess) {
        this.customerDetail = res?.data;
        // let data = this.customerDetail?.profiles.filter((e: any) => e.accountType == 'shipment');
        // this.userProfile = data[0];
        let item = this.customerDetail?.profiles.filter((e: any) => e.accountType == 'virtualMailBox');
        this.userDoc = item[0];
        this.isLoading = false
      } else {
        this.isLoading = false
      }
    })
  }
}
