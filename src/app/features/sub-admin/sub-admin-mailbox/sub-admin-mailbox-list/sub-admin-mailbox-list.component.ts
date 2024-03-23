
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService, ApiService } from 'src/app/core/services';
import { DatePipe } from '@angular/common';
import { UploadscanComponent } from 'src/app/features/admin/uploadscan/uploadscan.component';
import { AssignmailboxComponent } from 'src/app/features/admin/assignmailbox/assignmailbox.component';
import { AssignPlanComponent } from 'src/app/features/admin/customerlist/assign-plan/assign-plan.component';
import { DueDateDialogComponent } from 'src/app/features/admin/mailbox/due-date-dialog/due-date-dialog.component';

@Component({
  selector: 'app-sub-admin-mailbox-list',
  templateUrl: './sub-admin-mailbox-list.component.html',
  styleUrls: ['./sub-admin-mailbox-list.component.css']
})
export class SubAdminMailboxListComponent implements OnInit {

  isLoading: boolean = false;
  fromDate: any = '';
  sortBy: string = 'updatedAt,DSC';
  status: string = 'approved'
  assigne: string = ''
  toDate: any = '';
  minToDate = '';
  maxfromdDate = '';
  mailboxList: any = [];
  totalRecords: any;
  search: string = '';
  pageNo: number = 1;
  pageSize: number = 10;
  constructor(private dialog: MatDialog,
    private _toasterServices: ToasterService,
    private _apiServices: ApiService,
    private datepipe: DatePipe,
    // 
  ) { }

  ngOnInit(): void {
    this.getMailBoxDetail();
  }
  sortMailboxList() {
    if (this.sortBy == 'updatedAt,DSC') {
      this.sortBy = 'updatedAt,ASC';
      this.pageNo = 1
      this.getMailBoxDetail();
    } else {
      this.sortBy = 'updatedAt,DSC';
      this.pageNo = 1
      this.getMailBoxDetail();
    }
  }
  searchMailBoxDetail() {
    this.pageNo = 1
    this.getMailBoxDetail();
  }
  uploadscan(data: any): void {
    const dialogRef = this.dialog.open(UploadscanComponent, {
      width: '40%',
      height: '370px',
      panelClass: 'upload',
      disableClose:true,
      data: { uniqueId: data }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getMailBoxDetail();
      }
    })
  }
  getMailBoxDetailbyDate() {
    if (this.toDate) {
      this.getMailBoxDetail();
    }
  }
  getMailBoxDetail() {
    if (this.toDate && this.fromDate) {
      this.toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
      this.fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd')
    }
    let data = {
      search: this.search,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      toDate: this.toDate,
      fromDate: this.fromDate,
      assigne: this.assigne,
      sort: this.sortBy,
      status: this.status
    }
    this.isLoading = true;
    this._apiServices.getMailBoxOrderList(data).subscribe(res => {
      if (res.isSuccess) {
        this.mailboxList = res?.items;
        this.totalRecords = res?.totalRecords
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }

    })

  }

  reAssignMailbox(id: any) {
    const dialogRef = this.dialog.open(AssignmailboxComponent, {
      width: '40%',
      height: '250px',
      panelClass: 'upload',
      data: { id: id, assigneType: 'reassinge' }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.getMailBoxDetail();
      }
    })
  }
  markActiveInactive(item: any) {
    let data = {
      status: item?.status == 'inActive' ? 'approved' : 'inActive'
    }
    this.isLoading = true;
    this._apiServices.markActiveInactive(data, item?.id).subscribe(res => {
      if (res?.isSuccess) {
        this.isLoading = false;
        let msg = data?.status == 'approved' ? 'mark active successfully' : 'mark inactive successfully'
        this._toasterServices.successToast(msg);
        this.getMailBoxDetail();
      } else {
        this.isLoading = false;
      }
    })
  }


  givePlan(data: any) {

    this.dialog
      .open(AssignPlanComponent, {
        maxWidth: '900px',
        minWidth: '900px',
        height: '90vh',
        panelClass: 'dailogClass',
        data: { userId: data?.user?.id },
      }).afterClosed().subscribe(res => {
        if (res) {
          this.getMailBoxDetail();
        }

      })
  }
  changeDueDate(item: any) {
    this.dialog.open(DueDateDialogComponent, {
      width: '400px',
      height: '250px',
      panelClass: 'upload',
      data: { data:item }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.getMailBoxDetail();
      }
    })
  }

}