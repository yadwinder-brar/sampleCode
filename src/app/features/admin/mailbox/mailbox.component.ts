import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadscanComponent } from '../uploadscan/uploadscan.component';
import { ToasterService, ApiService } from 'src/app/core/services';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
  // inputConfig = {
  //   length: 5,
  //   disableAutoFocus: true,
  //   allowNumbersOnly: true,
  //   inputStyles: {
  //     borderRadius: ` 10px`,
  //     outline: 'none',
  //     textAlign: 'center',
  //     width: ' 50px',
  //     height: ' 50px',
  //     color: '#474849',
  //     border: ' 2px solid #8888881A',
  //     backgroundColor: '#fff',
  //     fontSize: '20px',
  //     fontWeight: '600',
  //     marginright: '30px',
  //   },
  // };
  // onOtpChange(e:any){

  // }
  isLoading: boolean = false;
  fromDate:string ='' 
  assigne:string ='' 
  toDate:string =''
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
    
    ) { }

  ngOnInit(): void {
    // this.getMailBoxDetail();
  }

  // uploadscan(): void {
  //   const dialogRef = this.dialog.open(UploadscanComponent, {
  //     width: '40%',
  //     height: '300px',
  //     panelClass: 'upload',
  //   });
  // }
  // getMailBoxDetailbyDate(){
  //   if(this.toDate){
  //     this.getMailBoxDetail();
  //   }
  // }
  // getMailBoxDetail(){
  //   let data = {
  //     search: this.search,
  //     pageNo: this.pageNo,
  //     pageSize: this.pageSize,
  //     toDate:this.toDate,
  //     fromDate:this.fromDate,
  //     assigne:this.assigne
  //   }
  //   this.isLoading = true;
  //   this._apiServices.getMailBoxOrderList(data).subscribe(res => {
  //     if (res.isSuccess) {
  //       this.mailboxList = res?.items;
  //       this.totalRecords = res?.totalRecords
  //       this.isLoading = false;
  //     } else {
  //       this.isLoading = false;
  //     }

  //   })
  
  // }



}