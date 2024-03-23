import { Component, OnInit } from '@angular/core';
import { ApiEndpoints } from 'src/app/core/config/api-endpoints.config';
import { ApiService, ToasterService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { EMPTY, catchError, take } from 'rxjs';
import { ProInvoiceDialogComponent } from '../../admin/invoicesbilling/pro-invoice-dialog/pro-invoice-dialog.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sub-admin-mandatory-invoices',
  templateUrl: './sub-admin-mandatory-invoices.component.html',
  styleUrls: ['./sub-admin-mandatory-invoices.component.css']
})
export class SubAdminMandatoryInvoicesComponent implements OnInit {
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
    private _activatedRoute:ActivatedRoute
  ) {
    let sessionId =
    this._activatedRoute.snapshot.queryParamMap.get('sessionId');
  if (sessionId) {
    this.PaymentStatus(sessionId);
  }
  }
  PaymentStatus(sessionId: string) {
    this.isloading = true;
    let data = {
      url: sessionId,
    };
    this._apiServices.forwardPayment(data).subscribe((res) => {
      if (res?.isSuccess) {
        this._toasterService.successToast('Payment Successful');
        this.getInvoiceList();
        this.isloading = false;
      } else {
        this.isloading = false;
        this._toasterService.errorToast('Payment failed');
      }
    });
  }
  ngOnInit(): void {
    this.getInvoiceList();
  }
  getInvoiceList() {
    this.isloading=true
    let userId = localStorage.getItem('id')
    let data = {
      date: this.date,
      search: this.search,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      payStatus: this.paymentStatus,
      sort: this.sortBy,
      userId :userId
    }
    this._apiServices.getSubAdminMandatoryInvoiceList(data).subscribe(res => {
      if (res.isSuccess) {
        this.InvoiceList = res?.items;
        this.totalRecords = res?.totalRecords;
        this.isloading=false
      }else{
        this.isloading=false
      }
    })
  }

  searchInvoice(event: any) {
    this.pageNo = 1;
    this.getInvoiceList();

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
  Pay(id: string) {
    this.isloading = true;
    let data = {
      invoiceId: id
    }
    this._apiServices.paySubAdminInvoice(data).subscribe(res => {
      if (res?.isSuccess) {
        let a = document.createElement('a');
        a.href = `${res?.data}`;
        a.click();
        this.isloading = false;
      } else {
        this.isloading = false;
      }
    })
  }
}



