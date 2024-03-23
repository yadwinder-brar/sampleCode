import { Component, OnInit } from '@angular/core';
import { ApiEndpoints } from 'src/app/core/config/api-endpoints.config';
import { ApiService, ToasterService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { EMPTY, catchError, take } from 'rxjs';
import { ProInvoiceDialogComponent } from '../../admin/invoicesbilling/pro-invoice-dialog/pro-invoice-dialog.component';
import { SubAdminCreateInvoiceComponent } from './sub-admin-create-invoice/sub-admin-create-invoice.component';

@Component({
  selector: 'app-sub-admin-invoices',
  templateUrl: './sub-admin-invoices.component.html',
  styleUrls: ['./sub-admin-invoices.component.css']
})
export class SubAdminInvoicesComponent implements OnInit {
  InvoiceList: any;
  mailboxInvoiceList: any;
  date: string = '';
  paymentStatus: string = 'paid';
  accountType: string = 'shipment';
  paidStatus: string = '0'
  status: string = ''
  isloading: boolean = false;
  sortBy: string = 'createdAt,DSC';
  totalRecords!: number;
  search: string = '';
  pageNo: number = 1;
  pageSize: number = 10;
  url: any = environment.apiUrls.baseApiUrl;
  constructor(
    private _apiServices: ApiService,
    private _toasterService: ToasterService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getInvoiceList();
  }
  onTabChanged(event: any) {
    if (this.paidStatus == '1') {
      this.status = 'pending'
      this.getInvoiceList();
    } else {
      this.status = 'paid'
      this.getInvoiceList();
    }
  }
  getInvoiceList() {
    this.isloading = true
    let data = {
      date: this.date,
      search: this.search,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      payStatus: this.paymentStatus,
      sort: this.sortBy
    }
    this._apiServices.getSubInvoiceList(data).subscribe(res => {
      if (res.isSuccess) {
        this.InvoiceList = res?.items;
        this.totalRecords = res?.totalRecords
        this.isloading = false
      }
    })
  }

  searchInvoice(event: any) {
    this.pageNo = 1;
    this.accountType == 'shipment' ? this.getInvoiceList() : this.getMailboxInvoiceList();

  }

  downloadInvoice(id: string) {
    this.isloading = true;
    // let data = this._apiServices.dowanloadShipmentInvoice(id).subscribe(res => {
    //   if (res.isSuccess) {
    //     // const a: any = document.createElement('a');
    //     // a.href = res?.data?.downloadUrl;
    //     // document.body.appendChild(a);
    //     // a.style = 'display: none';
    //     // a.target = 'blank'
    //     window.open(res?.data, "_blank");
    //     // a.click();
    //     this.isloading = false;
    //   } else {
    //     this.isloading = false;
    //   }
    // })

    let data = this.url + ApiEndpoints.Invoices.downloadShipmentInvoice + '/' + id

    window.open(data);
    this.isloading = false
  }
  downloadMailboxInvoice(id: string) {
    this.isloading = true;
    // let data = this._apiServices.dowanloadShipmentInvoice(id).subscribe(res => {
    //   if (res.isSuccess) {
    //     // const a: any = document.createElement('a');
    //     // a.href = res?.data?.downloadUrl;
    //     // document.body.appendChild(a);
    //     // a.style = 'display: none';
    //     // a.target = 'blank'
    //     window.open(res?.data, "_blank");
    //     // a.click();
    //     this.isloading = false;
    //   } else {
    //     this.isloading = false;
    //   }
    // })

    let data = this.url + ApiEndpoints.Invoices.downloadMailboxInvoice + '/' + id

    window.open(data);
    this.isloading = false
  }

  sortInvoices() {
    if (this.sortBy == 'createdAt,DSC') {
      this.sortBy = 'createdAt,ASC';
      this.pageNo = 1
      this.getInvoiceList()
    } else {
      this.sortBy = 'createdAt,DSC';
      this.pageNo = 1
      this.getInvoiceList()
    }
  }

  viewInvoice(e: any) {
    this.accountType = e.value
    if (this.accountType == 'shipment') {
      this.getInvoiceList();
    } else {
      this.getMailboxInvoiceList();
    }
  }
  viewInvoiceType(e: any) {
    if (this.accountType == 'shipment') {
      this.getInvoiceList();
    } else {
      this.getMailboxInvoiceList();
    }
  }

  getMailboxInvoiceList() {
    let data = {
      date: this.date,
      search: this.search,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      payStatus: this.paymentStatus,
      sort: this.sortBy
    }
    this._apiServices.getMailBoxInvoiceList(data).subscribe(res => {
      if (res.isSuccess) {
        this.mailboxInvoiceList = res?.items;
        this.totalRecords = res?.totalRecords
      }
    })
  }

  createInvoice() {
    this.dialog
      .open(SubAdminCreateInvoiceComponent, {
        maxWidth: '550px',
        minWidth: '500px',
        panelClass: 'dailogClass',
        data: {},
        disableClose: true
      })
      .afterClosed().subscribe(res => {
        if (res) {
          this.getInvoiceList();
        }
      })
  }
  createProInvoice(){
    this.dialog
    .open(ProInvoiceDialogComponent, {
      maxWidth: '550px',
      minWidth: '500px',
      panelClass: 'dailogClass',
      data: {},
      disableClose: true
    })
    .afterClosed().subscribe(res => {
      if (res) {
        this.getInvoiceList();
      }
    })
  }

  cancelInvoice(data:any) {
    this.dialog
      .open(ConfirmationComponent, {
        maxWidth: '390px',
        minWidth: '390px',
        panelClass: 'dailogClass',
        data: {
          title: 'Cancel Invoice',
          panelClass: 'dailogClass',
          description: 'Are you sure to cancel this invoice?',
        },
      })
      .afterClosed().subscribe(res => {
        if (res) {
          data?.invoiceVersion == "normal"?
          this.cancelUserInvoice(data?.id):this.cancelUserSpecialInvoice(data?.id);
        }
      })
  }

  cancelUserInvoice(id: string) {
    this.isloading = true;
    this._apiServices.cancelInvoice(id).pipe(
      catchError((error) => {
        error ? this.isloading = false : ''
        return EMPTY;
      }), take(1)).subscribe(res => {
        if(res?.isSuccess){
          this.isloading = false;
          this._toasterService.successToast('invoice canceled successfully')
          this.getInvoiceList();
        }else{
          this.isloading = false
        }
      })
  }
  cancelUserSpecialInvoice(id: string) {
    this.isloading = true;
    this._apiServices.cancelSpecialInvoice(id).pipe(
      catchError((error) => {
        error ? this.isloading = false : ''
        return EMPTY;
      }), take(1)).subscribe(res => {
        if(res?.isSuccess){
          this.isloading = false;
          this._toasterService.successToast('invoice canceled successfully')
          this.getInvoiceList();
        }else{
          this.isloading = false
        }
      })
  }

  cancelMailboxInvoice(id: string){
    this.dialog
    .open(ConfirmationComponent, {
      maxWidth: '390px',
      minWidth: '390px',
      panelClass: 'dailogClass',
      data: {
        title: 'Cancel Invoice',
        panelClass: 'dailogClass',
        description: 'Are you sure to cancel this invoice?',
      },
    })
    .afterClosed().subscribe(res => {
      if (res) {
        this.cancelUserMailboxInvoice(id);
      }
    })
  }

  cancelUserMailboxInvoice(id: string) {
    this.isloading = true;
    this._apiServices.cancelMailboxInvoice(id).pipe(
      catchError((error) => {
        error ? this.isloading = false : ''
        return EMPTY;
      }), take(1)).subscribe(res => {
        if(res?.isSuccess){
          this.isloading = false;
          this._toasterService.successToast('invoice canceled successfully')
          this.getMailboxInvoiceList();
        }else{
          this.isloading = false
        }
      })
  }

}



