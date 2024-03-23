import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { ConfirmationComponent } from '../../../confirmation/confirmation.component';
import { AssignmailboxComponent } from 'src/app/features/admin/assignmailbox/assignmailbox.component';

@Component({
  selector: 'app-subadmin-mailbox-request-list',
  templateUrl: './subadmin-mailbox-request-list.component.html',
  styleUrls: ['./subadmin-mailbox-request-list.component.css'],
})
export class SubadminMailboxRequestListComponent implements OnInit {
  isLoading: boolean = false;
  requestList: any = [];
  sortBy: string = 'createdAt,DSC';
  accountType: string = 'virtualMailBox';
  totalRecords: any;
  search: string = '';
  pageNo: number = 1;
  pageSize: number = 10;
  constructor(
    private dialog: MatDialog,
    private _toasterServices: ToasterService,
    private _apiServices: ApiService
  ) {}

  ngOnInit(): void {
    this.getMailboxRequestList();
  }
  sortMailboxRequestList() {
    if (this.sortBy == 'createdAt,DSC') {
      this.sortBy = 'createdAt,ASC';
      this.pageNo = 1;
      this.getMailboxRequestList();
    } else {
      this.sortBy = 'createdAt,DSC';
      this.pageNo = 1;
      this.getMailboxRequestList();
    }
  }
  getMailboxRequestList() {
    let data = {
      search: this.search,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      sort: this.sortBy,
      acountType: this.accountType,
    };
    this.isLoading = true;
    this._apiServices.getMailBoxRequestList(data).subscribe((res) => {
      if (res.isSuccess) {
        this.requestList = res?.items;
        this.totalRecords = res?.totalRecords;
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
    // profiles?accountType=virtualMailBox&status=pending
  }

  searchAddress(event: any) {
    this.getMailboxRequestList();
  }

  approveRequest(id: any) {
    const dialogRef = this.dialog
      .open(AssignmailboxComponent, {
        width: '40%',
        height: '250px',
        panelClass: 'upload',
        data: { id: id },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this._toasterServices.successToast(
            'Mailbox request approved succesfully'
          );
          this.getMailboxRequestList();
        }
      });
  }

  rejectRequest(id: any) {
    let data = {
      status: 'rejected',
      virtualId: '',
    };
    const dialogRef = this.dialog
      .open(ConfirmationComponent, {
        maxWidth: '390px',
        minWidth: '390px',
        panelClass: 'dailogClass',
        data: {
          title: 'Reject Mailbox Request',
          panelClass: 'dailogClass',
          description: 'Are you sure to reject mailbox request?',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this._apiServices
            .approveRejectMailBoxRequest(data, id)
            .subscribe((res) => {
              if (res.isSuccess) {
                this._toasterServices.successToast(
                  'Mailbox Rejected successfully'
                );
                this.getMailboxRequestList();
              }
            });
        }
      });
  }
}
