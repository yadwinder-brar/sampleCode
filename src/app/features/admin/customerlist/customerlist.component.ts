import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvitecustomerComponent } from '../invitecustomer/invitecustomer.component';
import { ApiService } from 'src/app/core/services/api.service';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { AssignPlanComponent } from './assign-plan/assign-plan.component';
import { ToasterService } from 'src/app/core/services';
import { User_Role } from 'src/app/share/enums/userRoles';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
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
      role:User_Role.USER
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

  invitecustomer(): void {
    const dialogRef = this.dialog.open(InvitecustomerComponent, {
      width: '40%',
      height: '240px',
      panelClass: 'upload',
      disableClose: true
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
            title: 'Delete User',
            panelClass: 'dailogClass',
            description: 'Are you sure to delete user?',
          },
        }).afterClosed().subscribe(res => {
          if (res) {
            this._apiServices.updateUserStatus(id, data).subscribe(res => {
              if (res?.isSuccess) {
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

  givePlan(id: string) {

    this.dialog
      .open(AssignPlanComponent, {
        maxWidth: '900px',
        minWidth: '900px',
        height: '90vh',
        panelClass: 'dailogClass',
        data: { userId: id },
      }).afterClosed().subscribe(res => {
        if (res) {
          this.getCustomerList();
        }

      })
  }

  addToVip(id: any, tag: string) {
    let data = {
      tag: tag
    }
    this.isLoading = true;
    this._apiServices.addUserToVip(id, data).subscribe(res => {
      if (res?.isSuccess) {
        this._toasterServices.successToast('user updated to ' + tag + '  successfully');
        this.getCustomerList();
      } else {
        this.isLoading = false;
      }
    })
  }
  hardDelete(item: string) {
    this.dialog
      .open(ConfirmationComponent, {
        maxWidth: '390px',
        minWidth: '390px',
        panelClass: 'dailogClass',
        data: {
          title: 'Delete User',
          panelClass: 'dailogClass',
          description: 'Are you sure to delete this user permanently?',
        },
      }).afterClosed().subscribe(res => {
        if (res) {
          this._apiServices.deleteUserForAdmin(item).subscribe(res => {
            if (res?.isSuccess) {
              this._toasterServices.successToast('user deleted permanently')
              this.getCustomerList();
            }
          })
        }
      })
  }
  isShipmentAccount(data: any) {
    let shipmentProfile = data?.profiles.filter((x: any) => x.accountType == 'shipment');
    return shipmentProfile?.length ? true : false
  }
  isMailboxAccount(data: any) {
    let mailboxProfile = data?.profiles.filter((x: any) => x.accountType == 'virtualMailBox');
    return mailboxProfile?.length ? true : false
  }
  showShipmentProfileStatus(data: any) {
    let shipmentProfile = data?.profiles.filter((x: any) => x.accountType == 'shipment');
    if (shipmentProfile && shipmentProfile.length) {
      let status = shipmentProfile[0].status
      return status
    } else {
      return 'No account'
    }
  }
  showMailboxProfileStatus(data: any) {
    let mailboxProfile = data?.profiles.filter((x: any) => x.accountType == 'virtualMailBox');
    if (mailboxProfile && mailboxProfile.length) {
      let status = mailboxProfile[0].status
      return status
    } else {
      return ' No account'
    }
  }

  deleteCustomerProfile(data: any, type: string) {
    let userId = data?.id
    let profile = data?.profiles.filter((x: any) => x.accountType == type);
    let profileId = profile[0]?.id
    this._apiServices.deleteCustomerProfile(userId,profileId,type).subscribe((res: any) => {
      if (res?.isSuccess) {
        // this._toasterServices.successToast('user profile deleted')
        this.updateUser(data, type);
      }
    })
  }
  updateUser(data: any, type: string) {
    let accountType = type == 'shipment' ? 'virtualMailBox': 'shipment' 
    let body = {
      accountType: accountType
    }
    this._apiServices.updateUserStatus(data?.id, body).subscribe(res => {
      if (res?.isSuccess) {
        this.getCustomerList();
      }
    })

  }
}
