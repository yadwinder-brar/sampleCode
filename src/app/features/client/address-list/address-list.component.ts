import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService, AuthService } from 'src/app/core/services';
import { AddtagsComponent } from '../addtags/addtags.component';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { ApiEndpoints } from 'src/app/core/config/api-endpoints.config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  userId: any;
  file: any;
  isloading: boolean = false;
  addressList: any = [];
  addressType: string = 'byUser';
  totalRecords: any
  search: string = '';
  sortBy: string = 'createdAt,DSC'
  addressTags: string = '';
  pageNo: number = 1;
  pageSize: number = 10;
  url: any = environment.apiUrls.baseApiUrl;
  constructor(
    private dialog: MatDialog,
    private _apiServices: ApiService,
    private _authServices: AuthService,

  ) {

    this.userId = this._authServices.getUserId();
  }

  ngOnInit(): void {
    this.getAddressList();
  }
  openDialog(selectedTags: any, id: string): void {
    const dialogRef = this.dialog.open(AddtagsComponent, {
      width: '550px',
      height: '320px',
      panelClass: 'addresslist',
      disableClose: true,
      data: { tags: selectedTags, id: id }
    });
    dialogRef.afterClosed().subscribe(data => {
      // if(data){
      this.getAddressList();
      // }
    })

  }

  searchAddress(e: any) {
    setTimeout(() => {
      this.pageNo = 1;
      this.getAddressList();
    }, 1000);
  }


  getAddressList() {
    let data = {
      userId: this.userId,
      search: this.search,
      addressTags: this.addressTags,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      addressType: this.addressType == 'byExcel'?'':'receiver',
      addressInputType:this.addressType,
      sort: this.sortBy
    }
    this.isloading = true;
    this._apiServices.getAddresess(data).subscribe(res => {
      if (res.isSuccess) {
        this.addressList = res?.items;
        this.totalRecords = res?.totalRecords
        this.isloading = false;
      } else {
        this.isloading = false;
      }

    })
  }

  deleteAddress(id: string) {
    this.dialog
      .open(ConfirmationComponent, {
        maxWidth: '390px',
        minWidth: '390px',
        panelClass: 'dailogClass',
        data: {
          title: 'Delete Address',
          panelClass: 'dailogClass',
          description: 'Are you sure you want to delete address?',
        },
      })
      .afterClosed().subscribe(res => {
        if (res) {
          this._apiServices.deleteAddress(id).subscribe(res => {
            if (res.isSuccess) {
              this.getAddressList();
            } else {

            }
          })
        }
      })
  }

  sortAddress() {
    if (this.sortBy == 'createdAt,DSC') {
      this.sortBy = 'createdAt,ASC';
      this.pageNo = 1
      this.getAddressList();
    } else {
      this.sortBy = 'createdAt,DSC';
      this.pageNo = 1
      this.getAddressList();
    }

  }

  exportAddressLIst() {
    this.isloading = true;
    // this._apiServices.exportAddressList(this.userId).pipe(take(1)).subscribe((res:any)=>{
    //   if(res){
    //     window.open(res ,'_blank')
    //   }else{
    //    this.isloading=false;
    //   }

    // },err => {
    //   this.isloading = false;
    //   this._toasterService.errorToast(err?.message);
    // },()=>{
    // })

    let data = this.url + ApiEndpoints.Addresses.ExportAddress + "?userId=" + this.userId

    window.open(data);
    this.isloading = false
  }

  selectFiles(event: any) {
    this.getAddressList();
  }
  fileChange(event: any) {
    this.file = event.target.files[0];
    this._apiServices.importAddressList(this.file).subscribe(res=>{
      if(res?.isSuccess){

      }else{

      }
    })
  }

}
