import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { environment } from 'src/environments/environment';
import { ApiEndpoints } from 'src/app/core/config/api-endpoints.config';
import { pipe } from 'rxjs/internal/util/pipe';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-addresslist',
  templateUrl: './addresslist.component.html',
  styleUrls: ['./addresslist.component.css']
})
export class AddresslistComponent implements OnInit {
  userId: any;
  isloading: boolean = false;
  sortBy:string = 'createdAt,DSC';
  addressList: any = [];
  totalRecords: any
  search: string = '';
  addressTags: string = '';
  addressType: string = 'byUser';
  pageNo: number = 1;
  pageSize: number = 10;
  url: any = environment.apiUrls.baseApiUrl;
  constructor(
    private dialog: MatDialog,
    private _apiServices: ApiService,
    private _authServices: AuthService,
    private _toasterService: ToasterService,

  ) {

    this.userId = this._authServices.getUserId();
  }

  ngOnInit(): void {
    this.getAddressList();
  }
  sortAddressList(){
    if(this.sortBy == 'createdAt,DSC'){
      this.sortBy = 'createdAt,ASC';
      this.pageNo = 1
      this.getAddressList();
    }else{
      this.sortBy = 'createdAt,DSC';
      this.pageNo = 1
      this.getAddressList();
    }
  }
  // openDialog( selectedTags:any , id:string): void {
  //   const dialogRef = this.dialog.open(AddtagsComponent, {
  //     width: '550px',
  //     height: '320px',
  //     panelClass: 'addresslist',
  //     disableClose: true,
  //     data:{tags:selectedTags, id:id}
  //   });
  //   dialogRef.afterClosed().subscribe(data=>{   
  //     // if(data){
  //       this.getAddressList();
  //     // }
  // })

  // }

  searchAddress(e: any) {
    setTimeout(() => {
      this.pageNo = 1;
      this.getAddressList();
    }, 1000);
  }


  getAddressList() {
    let data = {
      userId: '',
      search: this.search,
      addressTags: this.addressTags,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      addressType:this.addressType=='byExcel'?'':'sender',
      addressInputType: this.addressType,
      sort: this.sortBy
    }
    this.isloading = true;
    this._apiServices.getAddresess(data).pipe(take(1)).subscribe(res => {
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
        .afterClosed().subscribe(res=>{
          if(res){
            this._apiServices.deleteAddress(id).subscribe(res => {
              if (res.isSuccess) {
                this.getAddressList();
              } else {
        
              }
            })
          }
        })
    }

    importAddressLIst(){
  
    }
    exportAddressLIst(){
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
 
    let data = this.url + ApiEndpoints.Addresses.ExportAddress+"?userId="+this.userId

    window.open(data);
    this.isloading = false
    }
   
    
    uploadFile(event:any){
      this.getAddressList();
    }

}

