import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ConfirmationComponent } from '../../../confirmation/confirmation.component';
import { AuthService, ToasterService } from 'src/app/core/services';
import { User_Role } from 'src/app/share/enums/userRoles';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sub-admin-list',
  templateUrl: './sub-admin-list.component.html',
  styleUrls: ['./sub-admin-list.component.css']
})
export class SubAdminListComponent implements OnInit {
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
    private dialog: MatDialog,
    private _apiServices: ApiService,
    private _toasterServices: ToasterService,
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.getCustomerList();
  }
  searchCustomer(event: any) {
    this.search = event?.target?.value;
    this.pageNo = 1;
    this.getCustomerList();
  }
  getCustomers() {
    this.pageNo = 1;
    this.getCustomerList();
  }

  getCustomerList() {
    let data = {
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      search: this.search,
      status: this.status,
      sort: this.sortBy,
      userPositionTag: this.position || '',
      accountType: this.accountType,
      role: User_Role.SUB_ADMIN
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

  sortCustomerList() {
    if (this.sortBy == 'createdAt,DSC') {
      this.sortBy = 'createdAt,ASC';
      this.pageNo = 1
      this.getCustomerList();
    } else {
      this.sortBy = 'createdAt,DSC';
      this.pageNo = 1
      this.getCustomerList();
    }
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
            title: 'Delete Sub-admin',
            panelClass: 'dailogClass',
            description: 'Are you sure to delete sub-admin?',
          },
        }).afterClosed().subscribe(res => {
          if (res) {
            this._apiServices.updateUserStatus(id, data).subscribe(res => {
              if (res?.isSuccess) {
                this._toasterServices.successToast('subAdmin deleted successfully');
                this.getCustomerList();
              }
            })
          }
        })
    } else {
      this._apiServices.updateUserStatus(id, data).subscribe(res => {
        if (res?.isSuccess) {
          this.getCustomerList();
        }
      })
    }

  }
  hardDelete(item: string) {
    this.dialog
      .open(ConfirmationComponent, {
        maxWidth: '390px',
        minWidth: '390px',
        panelClass: 'dailogClass',
        data: {
          title: 'Delete Sub-admin',
          panelClass: 'dailogClass',
          description: 'Are you sure to delete this Sub-admin permanently?',
        },
      }).afterClosed().subscribe(res => {
        if (res) {
          this._apiServices.deleteUserForAdmin(item).subscribe(res => {
            if (res?.isSuccess) {
              // this._toasterServices.successToast('Sub-admin deleted permanently')
              this.getCustomerList();
            }
          })
        }
      })
  }
  loginToSubAdminAccount(id: string) {
    let data = {
      userId: id,
      deviceId: "djskds",
      deviceType: "web"
    }
this.isLoading=true
    this._apiServices.loginToSubAdminAcc(data).subscribe(res => {
      if (res?.isSuccess){
        let adminToken:any = localStorage.getItem('x-access-token');
        let adminProfile:any = this._authService.getUserProfile();
        let adminId:any = this._authService.getUserId();
        localStorage.clear();
      this._authService.storeAuthToken(res.data.accessToken);
      this._authService.storeUserProfile(res.data?.id);
      this._authService.storeUserId(res.data.id?._id);
      this._authService.storeAdminToken(adminToken);
      this._authService.storeAdminProfile(adminProfile);
      this._router.navigate(['subAdmin'])
      this.isLoading=false
      }{
        this.isLoading=false
      }
    })
  }



}
