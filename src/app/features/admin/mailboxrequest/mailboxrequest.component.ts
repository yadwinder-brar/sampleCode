import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';

@Component({
  selector: 'app-mailboxrequest',
  templateUrl: './mailboxrequest.component.html',
  styleUrls: ['./mailboxrequest.component.css']
})
export class MailboxrequestComponent implements OnInit {
  isLoading: boolean = false;
  requestList: any = [];
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
    // this.getMailboxRequestList();
  }
  // getMailboxRequestList(){
  //   let data = {
  //     search: this.search,
  //     pageNo: this.pageNo,
  //     pageSize: this.pageSize,
  //   }
  //   this.isLoading = true;
  //   this._apiServices.getMailBoxRequestList(data).subscribe(res => {
  //     if (res.isSuccess) {
  //       this.requestList = res?.items;
  //       this.totalRecords = res?.totalRecords
  //       this.isLoading = false;
  //     } else {
  //       this.isLoading = false;
  //     }

  //   })
  //   // profiles?accountType=virtualMailBox&status=pending
  // }

  // searchAddress(event:any){
  //   this.getMailboxRequestList();
  // }



  // rejectRequest(id:any){
  //   let data ={
  //     status: "rejected",
  //     virtualId: ""
  //   }
  //   const dialogRef =  this.dialog
  //   .open(ConfirmationComponent, {
  //     maxWidth: '390px',
  //     minWidth: '390px',
  //     panelClass: 'dailogClass',
  //     data: {
  //       title: 'Reject mailbox request',
  //       panelClass: 'dailogClass',
  //       description: 'Are you sure to reject mailbox request?',
  //     },
  //   })
  //   .afterClosed().subscribe(res => {
  //     if (res) {
  //   this._apiServices.approveRejectMailBoxRequest(data,id).subscribe(res=>{
  //     if(res.isSuccess){
  //       this._toasterServices.successToast('Mailbox Rejected successfully');
  //       this.getMailboxRequestList();
  //     }
  //   })
  // }})
  // }
}
