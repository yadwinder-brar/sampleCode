import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { catchError, EMPTY, take } from 'rxjs';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { ConfirmationComponent } from 'src/app/features/confirmation/confirmation.component';

@Component({
  selector: 'app-all-shipments',
  templateUrl: './all-shipments.component.html',
  styleUrls: ['./all-shipments.component.css']
})
export class AllShipmentsComponent implements OnInit {
  userId: any;
  totalRecords: any
  search: string = '';
  accountType: string = 'shipment';
  sortBy:string = 'createdAt,DSC'
  // ASC
  MaxDate: any;
  shipmentDate: any = '';
  isloading:boolean= false;
  shipmentStatus: any = '';
  pageNo: number = 1;
  pageSize: number = 10;
  shipmentData: any = [];
  bulkShipmentData: any = [];
  constructor(
    private _apiService: ApiService,
    private _router: Router,
    private dialog: MatDialog,
    private element: ElementRef,
    private toasterService: ToasterService,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService
  ) {
    this.userId = this._authService.getUserId();
    this.MaxDate = new Date();

    let data = this._activatedRoute.snapshot.queryParamMap.get('status')
    this.shipmentStatus = data|| '';
    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      var scrollToTop = window.setInterval(function () {
        var pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 16); // how fast to scroll (this equals roughly 60 fps)
    });
    this._router.events.subscribe((path) => {
      this.element.nativeElement.scrollIntoView();
    });



  }

  ngOnInit(): void {
    this.getShipments();
  }
  getShipments() {
    let data = {
      userId: this.userId,
      search: this.search,
      shipmentDate: this.shipmentDate,
      shipmentStatus: this.shipmentStatus,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      sort: this.sortBy
    }
    this.isloading = true
    this._apiService.getShipments(data).subscribe(res => {
      if (res.isSuccess) {
        this.shipmentData = res.items;
        this.totalRecords = res?.totalRecords
        this.isloading = false;
      }else{
        this.isloading = false;
      }
    })
  }
  searchShipment(e: any) {
      this.pageNo = 1;
      if(this.accountType =='shipment' ){
        this.getShipments()
      }else{
     this.getBulkShipments();
      }
  
  }
  sortShipments(){
if(this.sortBy == 'createdAt,DSC'){
  this.sortBy = 'createdAt,ASC';
  this.pageNo = 1
  this.getShipments();
}else{
  this.sortBy = 'createdAt,DSC';
  this.pageNo = 1
  this.getShipments();
}

  }
  deleteShipment(id: string) {
    this._apiService.deleteShipment(id).subscribe(res => {
      if (res.isSuccess) {
        this.getShipments();
      }
    })
  }

  ViewShipment(item: any) {
    if(item?.status == 'inTransit' && item?.isPaymentComplete==false){
      this.toasterService.errorToast('Payment failed, this shipment has been cancelled and it will be deleted soon')
      return
    }
    if (item?.status == 'drafted') {
      localStorage.setItem('shipmentId', item?.id);
      this._router.navigate(['/client/add-shipment/sender-address'])
    }
    else{
      this._router.navigate(['/client/shipments/shipment-detail/'+item?.id])
    }
    if(item?.status == 'inTransit'){
      this._router.navigate(['/client/shipments/shipment-detail/'+item?.id])

    }
  }


  viewInvoice(e:any){
    this.accountType = e.value
    if(this.accountType =='shipment' ){
      this.getShipments()
    }else{
   this.getBulkShipments();
    }
  }

  getBulkShipments(){
    let data = {
      userId: this.userId,
      search: this.search,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      sort: this.sortBy
    }
    this.isloading = true
    this._apiService.getBulkShipments(data).subscribe(res => {
      if (res.isSuccess) {
        this.bulkShipmentData = res.items;
        this.totalRecords = res?.totalRecords
        this.isloading = false;
      }else{
        this.isloading = false;
      }
    })
  }
  selectFiles(e:any){
    this.getBulkShipments();
  }
  deleteBulkShipment(id:any){
    this.isloading = true
    this._apiService.deleteBulkShipments(id).pipe(catchError((error) => {
      error?this.isloading = false:''
      this.toasterService.errorToast(error?.message);
      return EMPTY;
    }),take(1)).subscribe(res => {
      if (res.isSuccess) {
        this.getBulkShipments();
      }else{
        this.isloading = false;
      }
    })
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

}

