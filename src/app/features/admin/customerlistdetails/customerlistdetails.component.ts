import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { PostOfficeFormDetailComponent } from '../mailboxrequest/post-office-form-detail/post-office-form-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable, catchError, take } from 'rxjs';
import { ToasterService } from 'src/app/core/services';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiEndpoints } from 'src/app/core/config/api-endpoints.config';
@Component({
  selector: 'app-customerlistdetails',
  templateUrl: './customerlistdetails.component.html',
  styleUrls: ['./customerlistdetails.component.css']
})
export class CustomerlistdetailsComponent implements OnInit {
  totalRecords: any
  url: any = environment.apiUrls.baseApiUrl;
  search: string = '';
  shipmentDate: any = '';
  isloading: boolean = false;
  shipmentStatus: string = ''
  pageNo: number = 1;
  pageSize: number = 10;
  shipmentData: any = [];
  customerId: string = '';
  customerDetail: any = [];
  userProfile: any;
  userDoc: any;
  constructor(
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    private dialog: MatDialog,
    private http: HttpClient,
    private _toasterService:ToasterService
  ) {

    this.customerId = this._route.snapshot.params["id"];
  }

  ngOnInit(): void {
    if (this.customerId) {
      this.getUserDetail();
    }
    this.getShipments();
  }

  getUserDetail() {
    this.isloading = true
    this._apiService.getUserDetail(this.customerId).subscribe(res => {
      if (res?.isSuccess) {
        this.customerDetail = res?.data;
        let data = this.customerDetail?.profiles.filter((e: any) => e.accountType == 'shipment');
        this.userProfile = data[0];
        let item = this.customerDetail?.profiles.filter((e: any) => e.accountType == 'virtualMailBox');
        this.userDoc = item[0];
        this.isloading = false
      } else {
        this.isloading = false
      }
    })
  }

  getShipments() {
    let data = {
      userId: this.customerId,
      search: this.search,
      shipmentDate: this.shipmentDate,
      shipmentStatus: this.shipmentStatus,
      pageNo: this.pageNo,
      pageSize: this.pageSize
    }
    this._apiService.getCustomerShipments(data).subscribe(res => {
      if (res.isSuccess) {
        this.shipmentData = res.items;
        this.totalRecords = res?.totalRecords
        this.isloading = false;
      } else {
        this.isloading = false;
      }
    })
  }
  searchShipment(e: any) {
    setTimeout(() => {
      this.pageNo = 1;
      this.getShipments();
    }, 1000);
  }

  getNetPriceValue(data: any) {
    let value = data?.filter((x: any) => x.name == 'totalNetCharge');
    return value?.length ? value[0]?.value : ''
  }
  getOriginalPriceValue(data: any) {
    let value = data?.filter((x: any) => x.name == 'originalPrice');
    return value?.length ? value[0]?.value : ''
  }
  openForm(data: any) {
    let item = data?.profiles.filter((e: any) => e.accountType == "virtualMailBox");
    let detail = item[0];
    this.dialog.open(PostOfficeFormDetailComponent, {
      width: '90%',
      height: '600px',
      panelClass: 'dailogClass',
      data: { userData: detail }
    })
  }
  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }
  downloadForm(data: any) {
    let custProfile = data.filter((p: any) => p.accountType === "virtualMailBox");
    let profileId = custProfile[0]?.id

    let apiData = this.url + ApiEndpoints.DownloadForm.DownloadMailboxForm + '/' + profileId

    window.open(apiData);
    // this._apiService.downloadForm(profileData).pipe(catchError((error) => {
    //   // error ? this.isLoading = false : ''
    //   this._toasterService.errorToast(error?.message);
    //   return EMPTY;
    // }), take(1)).subscribe(blob => {
    //   debugger
    //   if(blob){const a = document.createElement('a')
    //     const objectUrl = URL.createObjectURL(blob)
    //     a.href = objectUrl
    //     a.download = 'ProfImg';
    //     a.click();
    //     URL.revokeObjectURL(objectUrl);
    //   }
    // })

  }
}
