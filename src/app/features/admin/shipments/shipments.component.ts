  import { Component, ElementRef, OnInit } from '@angular/core';
  import { NavigationEnd, Router } from '@angular/router';
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
    isloading:boolean= false;
    shipmentStatus: any = ''
    shipmentUser: any = 'admin'
    pageNo: number = 1;
    pageSize: number = 10;
    shipmentData: any = [];
    constructor(
      private _apiService: ApiService,
      private _router: Router,
      private element: ElementRef,
      private _authService: AuthService
    ) {
      this.userId = this._authService.getUserId();
      this.MaxDate = new Date();
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
      // this.getShipments();
    }
    getShipments() {
      let data = {
        userId: this.userId,
        search: this.search,
        shipmentDate: this.shipmentDate,
        shipmentStatus: this.shipmentStatus,
        pageNo: this.pageNo,
        pageSize: this.pageSize,

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
    userType(event:any){
// let data = event.value;

// if (data=='user'){
// this.getUserShipments();
// }else{
//   this.getShipments();
// }

//     }
//     getUserShipments(){
//       let data = {
//         userId: '',
//         search: this.search,
//         shipmentDate: this.shipmentDate,
//         shipmentStatus: this.shipmentStatus,
//         pageNo: this.pageNo,
//         pageSize: this.pageSize,
//       }
//       this.isloading = true
//       this._apiService.getShipments(data).subscribe(res => {
//         if (res.isSuccess) {
//           this.shipmentData = res.items;
//           this.totalRecords = res?.totalRecords
//           this.isloading = false;
//         }else{
//           this.isloading = false;
//         }
//       })
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
         // localStorage.setItem('shipmentId', item?.id);
        // this._router.navigate(['/client/add-shipment/sender-address'])
      }
      if(item?.status == 'inTransit'){
        // this._router.navigate(['/client/shipments/shipment-detail/'+item?.id])
  
      }
    }
  
  }
  
  
