  import { Component, OnInit } from '@angular/core';
  import { MatDialog } from '@angular/material/dialog';
  import { ApiService, ToasterService } from 'src/app/core/services';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';

@Component({
  selector: 'app-shipment-request',
  templateUrl: './shipment-request.component.html',
  styleUrls: ['./shipment-request.component.css']
})
export class ShipmentRequestComponent implements OnInit {
    isLoading: boolean = false;
    requestList: any = [];
    sortBy:string = 'createdAt,DSC'
    accountType:string = 'shipment'
    totalRecords: any;
    search: string = '';
    pageNo: number = 1;
    pageSize: number = 10;
    constructor(
      private dialog: MatDialog,
      private _toasterServices: ToasterService,
      private _apiServices: ApiService,

    ) {}

    ngOnInit(): void {
      this.getShipmentRequestList();
    }
    sortMailboxRequestList(){
      if(this.sortBy == 'createdAt,DSC'){
        this.sortBy = 'createdAt,ASC';
        this.pageNo = 1
        this.getShipmentRequestList();
      }else{
        this.sortBy = 'createdAt,DSC';
        this.pageNo = 1
        this.getShipmentRequestList();
      }
    }
    getShipmentRequestList(){
      let data = {
        search: this.search,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sort: this.sortBy,
        acountType:this.accountType
      }
      this.isLoading = true;
      this._apiServices.getMailBoxRequestList(data).subscribe(res => {
        if (res.isSuccess) {
          this.requestList = res?.items;
          this.totalRecords = res?.totalRecords
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }

      })
      // profiles?accountType=virtualMailBox&status=pending
    }

    searchAddress(event:any){
      this.getShipmentRequestList();
    }

    approveRequest(id:any){
     let  data={
      status:'approved'
     }
      this._apiServices.approveRejectShipmentRequest(data,id).subscribe(res=>{
        if(res.isSuccess){
          this._toasterServices.successToast('shipment account approved successfully');
          this.getShipmentRequestList();
        }
      })
    }

    rejectRequest(id:any){
      let data ={
        status: "rejected",
      }
      const dialogRef =  this.dialog
      .open(ConfirmationComponent, {
        maxWidth: '480px',
        minWidth: '480px',
        minHeight: '220px',
        panelClass: 'dailogClass',
        data: {
          title: 'Reject Shipment account Request',
          panelClass: 'dailogClass',
          description: 'Are you sure to reject shipment account request?',
        },
      })
      .afterClosed().subscribe(res => {
        if (res) {
      this._apiServices.approveRejectShipmentRequest(data,id).subscribe(res=>{
        if(res.isSuccess){
          this._toasterServices.successToast('shipment account Rejected successfully');
          this.getShipmentRequestList();
        }
      })
    }})
    }
  }




