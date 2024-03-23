import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable, catchError, take } from 'rxjs';
import { ToasterService } from 'src/app/core/services';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiEndpoints } from 'src/app/core/config/api-endpoints.config';
@Component({
  selector: 'app-sub-admin-detail',
  templateUrl: './sub-admin-detail.component.html',
  styleUrls: ['./sub-admin-detail.component.css']
})
export class SubAdminDetailComponent implements OnInit {
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
  }

  getUserDetail() {
    this.isloading = true
    this._apiService.getUserDetail(this.customerId).subscribe(res => {
      if (res?.isSuccess) {
        this.customerDetail = res?.data;
        this.isloading = false
      } else {
        this.isloading = false
      }
    })
  }


  
  openForm(data: any) {
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

