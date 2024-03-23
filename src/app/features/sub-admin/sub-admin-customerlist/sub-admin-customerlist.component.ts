import { Component, OnInit } from '@angular/core';
import { ApiService, ToasterService } from 'src/app/core/services';
import { User_Role } from 'src/app/share/enums/userRoles';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sub-admin-customerlist',
  templateUrl: './sub-admin-customerlist.component.html',
  styleUrls: ['./sub-admin-customerlist.component.css']
})
export class SubAdminCustomerlistComponent implements OnInit {
  customerList: any = [];
  isLoading: boolean = false;
  sortBy: string = 'createdAt,DSC'
  accountType: string = '';
  position: string = '';
  totalRecords: any
  pageNo: any = 1;
  pageSize: any = 10;
  search: string = '';
  status: string = '';

  constructor(
    private _apiServices:ApiService,
    private dialog: MatDialog,
    private _toasterServices: ToasterService,
    ) { }

  ngOnInit(): void {
    this.getCustomerList()
  }

  getCustomers() { }
  getCustomerList() {
    let data = {
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      search: this.search,
      status: this.status,
      sort: this.sortBy,
      userPositionTag: this.position || '',
      accountType: this.accountType,
      role: User_Role.USER
    }
    this.isLoading = true;
    this._apiServices.getUsersList(data).subscribe(res => {
      if (res?.isSuccess) {
        this.customerList = res?.items;
        this.totalRecords = res?.totalRecords
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    })
  }

  userAction(id: string, userStatus: string) {
    let data = {
      status: userStatus
    }
    if (userStatus == 'deleted') {
      this.dialog
        .open(ConfirmationComponent, {
          maxWidth: '390px',
          minWidth: '390px',
          panelClass: 'dailogClass',
          data: {
            title: 'Delete User',
            panelClass: 'dailogClass',
            description: 'Are you sure to delete user?',
          },
        }).afterClosed().subscribe(res => {
          if (res) {
            this._apiServices.updateUserStatus(id, data).subscribe(res => {
              if (res?.isSuccess) {
                this._toasterServices.successToast(`user ${userStatus} successfully`)
                this.getCustomerList();
              }
            })
          }
        })
    } else {
      this._apiServices.updateUserStatus(id, data).subscribe(res => {
        if (res?.isSuccess) {
          this._toasterServices.successToast(`user ${userStatus} successfully`)
          this.getCustomerList();
        }
      })
    }

  }





}
