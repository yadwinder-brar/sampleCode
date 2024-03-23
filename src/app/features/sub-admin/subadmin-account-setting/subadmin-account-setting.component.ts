import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService, AuthService } from 'src/app/core/services';
import { SubAdminSalesTaxEditComponent } from './subAdmin-salesTax-edit/subAdmin-salesTax-edit.component';

@Component({
  selector: 'app-subadmin-account-setting',
  templateUrl: './subadmin-account-setting.component.html',
  styleUrls: ['./subadmin-account-setting.component.css']
})
export class SubadminAccountSettingComponent implements OnInit {
  userData:any;
  isLoading: boolean = false
  accountSettingList: any;
  selectedOption: boolean = true
  constructor(
    private _authService:AuthService,
    private _apiServices: ApiService,
    private dialog: MatDialog
  ) { 

    this.userData = this._authService.getUserProfile();
  }

  ngOnInit(): void {
    this.getAccountSettingList()
  }
  getAccountSettingList() {
    this.isLoading = true;
    this._apiServices.getSubAdminAccountSetting().subscribe((res) => {
      if (res?.isSuccess) {
        this.accountSettingList = res?.data;
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }
  editMargin(data:any): void {
  this.dialog.open(SubAdminSalesTaxEditComponent, {
      width: '30%',
      panelClass: 'upload',
     data:{item:data}
    }).afterClosed().subscribe(res=>{
      if(res){
        this.getAccountSettingList();
      }
    })
  }
}
