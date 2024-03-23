import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditdiscountComponent } from '../editdiscount/editdiscount.component';
import { EditmarginComponent } from '../editmargin/editmargin.component';
import { ApiService } from 'src/app/core/services';
import { EditVipDiscountComponent } from '../edit-vip-discount/edit-vip-discount.component';

@Component({
  selector: 'app-margindiscount',
  templateUrl: './margindiscount.component.html',
  styleUrls: ['./margindiscount.component.css']
})
export class MargindiscountComponent implements OnInit {
isLoading:boolean = false;
customerList: any = [];
sortBy:string = 'createdAt,DSC';
totalRecords: any
position: string = 'vip';
search: string = '';
pageNo: any = 1;
pageSize: any = 10;
marginAndDiscountData:any
  constructor(
    private dialog:MatDialog,
    private _apiServices:ApiService
    ) { }

  ngOnInit(): void {
    this.getMarginAndDiscount();
    this.getCustomerList();
  }
  editMargin(data:any): void {
    const dialogRef = this.dialog.open(EditmarginComponent, {
      width: '40%',
      height: '240px',
      panelClass: 'upload',
     data:{item:data}
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.getMarginAndDiscount();
      }
    })
  }
  editDiscount(data:any): void {
    const dialogRef = this.dialog.open(EditdiscountComponent, {
      width: '40%',
      height: '240px',
      panelClass: 'upload',
      data:{item:data}
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.getMarginAndDiscount();
      }
    })
}

editUserDiscount(item:any){
  const dialogRef = this.dialog.open(EditVipDiscountComponent, {
    width: '50%',
    height: '350px',
    panelClass: 'upload',
    data:{userData:item}
  });
  dialogRef.afterClosed().subscribe(res=>{
    if(res){
      this.getCustomerList();
    }
  })
}

getMarginAndDiscount(){
  this.isLoading = true
this._apiServices.getMarginAndDiscountDetail().subscribe(res=>{
   if(res?.isSuccess){
    this.marginAndDiscountData = res?.items[0];
    this.isLoading = false
   }else{
    this.isLoading = false
   }
})
}
searchCustomer(event: any) {
  this.search = event?.target?.value;
  this.pageNo = 1;
  this.getCustomerList();
}
getCustomerList() {
  let data = {
    pageNo: this.pageNo,
    pageSize: this.pageSize,
    search: this.search,
    userPositionTag:this.position,
    status: '',
    sort: this.sortBy,
    accountType:'both,shipment'
    // accountType:'shipment' change as client feedback
  }
  // this.isLoading = true;
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

sortCustomerList(){
  if(this.sortBy == 'createdAt,DSC'){
    this.sortBy = 'createdAt,ASC';
    this.pageNo = 1
    this.getCustomerList();
  }else{
    this.sortBy = 'createdAt,DSC';
    this.pageNo = 1
    this.getCustomerList();
  }
}
}

