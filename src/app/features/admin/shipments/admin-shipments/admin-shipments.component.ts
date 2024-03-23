import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { catchError } from 'rxjs/internal/operators/catchError';
import { take } from 'rxjs/internal/operators/take';
import { ApiService, AuthService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/features/confirmation/confirmation.component';

@Component({
  selector: 'app-admin-shipments',
  templateUrl: './admin-shipments.component.html',
  styleUrls: ['./admin-shipments.component.css']
})
export class AdminShipmentsComponent implements OnInit {
  userId: any;
  totalRecords: any
  sortBy: string = 'createdAt,DSC'
  search: string = '';
  MaxDate: any;
  shipmentDate: any = '';
  isloading: boolean = false;
  shipmentStatus: any = ''
  shipmentUser: string = 'user'
  pageNo: number = 1;
  pageSize: number = 10;
  shipmentData: any = [];
  constructor(
    private _apiService: ApiService,
    private _router: Router,
    private dialog: MatDialog,
    private _authService: AuthService
  ) {
    this.userId = this._authService.getUserId();
    this.MaxDate = new Date()
  }

  ngOnInit(): void {
    this.getShipments();
  }
  sortShipments() {
    if (this.sortBy == 'createdAt,DSC') {
      this.sortBy = 'createdAt,ASC';
      this.pageNo = 1
      this.getShipments();
    } else {
      this.sortBy = 'createdAt,DSC';
      this.pageNo = 1
      this.getShipments();
    }
  }
  getShipments() {
    let data = {
      userId: this.shipmentUser == 'self' ? this.userId : '',
      search: this.search,
      shipmentDate: this.shipmentDate,
      shipmentStatus: this.shipmentStatus,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      shipmentListType: this.shipmentUser,
      sort: this.sortBy

    }
    this.isloading = true
    this._apiService.getShipments(data).subscribe(res => {
      if (res.isSuccess) {
        this.shipmentData = res.items;
        this.totalRecords = res?.totalRecords
        this.isloading = false;
      } else {
        this.isloading = false;
      }
    })
  }
  userType(event: any) {
    let data = event.value;
    this.pageNo = 1;
    if (data == 'user') {
      this.getUserShipments();
    } else {
      this.getShipments();
    }

  }
  getUserShipments() {
    let data = {
      userId: '',
      search: this.search,
      shipmentDate: this.shipmentDate,
      shipmentStatus: this.shipmentStatus,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      shipmentListType: this.shipmentUser
    }
    this.isloading = true
    this._apiService.getShipments(data).subscribe(res => {
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

  deleteShipment(id: string) {
    this._apiService.deleteShipment(id).subscribe(res => {
      if (res.isSuccess) {
        this.getShipments();
      }
    })
  }

  ViewShipment(item: any) {
    if (item?.status == 'drafted') {
      localStorage.setItem('shipmentId', item?.id);
      this._router.navigate(['/admin/add-shipment/sender-address'])
    }else{
      this._router.navigate(['/admin/shipments/shipment-detail/' + item?.id])
    }
    if (item?.status == 'inTransit') {
      this._router.navigate(['/admin/shipments/shipment-detail/' + item?.id])

    }
  }


  cancelShipment(id:any){
    this.dialog
    .open(ConfirmationComponent, {
      maxWidth: '390px',
      minWidth: '390px',
      panelClass: 'dailogClass',
      data: {
        title: 'Cancel shipment',
        panelClass: 'dailogClass',
        description: 'Are you sure to cancel this shipment',
      },
    })
    .afterClosed().subscribe(res => {
      if (res) {
       this.cancelShipmentDone(id);
      }
    })

  }


  cancelShipmentDone(id: any) {
    this.isloading = false
    this._apiService.cancelShipment(id).pipe(
      catchError((error) => {
        error ? this.isloading = false : ''
        return EMPTY;
      }), take(1)).subscribe(res => {
        if(res?.isSuccess){
          this.isloading = false;
          this.getShipments();
        }else{
          this.isloading = false
        }
      })
    }

getNetPriceValue(data:any){
  let value =  data?.filter((x:any)=>x.name =='totalNetCharge');
 return value?.length?value[0]?.value:''
}
getOriginalPriceValue(data:any){
  let value =  data?.filter((x:any)=>x.name =='originalPrice');
 return value?.length?value[0]?.value:''
}


}


