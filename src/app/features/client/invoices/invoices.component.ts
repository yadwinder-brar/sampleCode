import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiEndpoints } from 'src/app/core/config/api-endpoints.config';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  InvoiceList: any = [];
  date: string = '';
  count: any = ''
  paidStatus = 0
  status: string = 'paid'
  sortBy: string = 'createdAt,DSC';
  isloading: boolean = false;
  totalRecords: any
  search: string = '';
  pageNo: number = 1;
  pageSize: number = 10;
  url: any = environment.apiUrls.baseApiUrl;
  constructor(
    private _apiServices: ApiService,
    private _toasterServices: ToasterService,
    private _activatedRoute: ActivatedRoute
  ) {
    let sessionId = this._activatedRoute.snapshot.queryParamMap.get('sessionId');
    if (sessionId) {
      this.PaymentStatus(sessionId);
    }
    let invoiceType = this._activatedRoute.snapshot.queryParamMap.get('invoiceType');
    invoiceType == 'unpaid' ? this.paidStatus = 1:this.paidStatus = 0
    this.status=invoiceType?invoiceType:'paid'
  }

  ngOnInit(): void {
    this.getInvoiceList();
    this.getUnpaidInvoiceCount();
  }
  PaymentStatus(sessionId: string) {
    this.isloading = true;
    let data = {
      url: sessionId
    }
    this._apiServices.shipmentInvoicePayment(data).subscribe(res => {
      this.paidStatus = 1
      this.status = 'unpaid'
      if (res?.isSuccess) {
        this._toasterServices.successToast('Payment Successful');
        this.getUnpaidInvoiceCount();
        this.isloading = false;
      } else {
        this.isloading = false;
        this._toasterServices.successToast('Payment failed')
      }
    })
  }
  onTabChanged(event: any) {
    this.InvoiceList = []
    if (this.paidStatus == 1) {
      this.status = 'unpaid'
      this.getInvoiceList();
    } else {
      this.status = 'paid'
      this.getInvoiceList();
    }
  }
  getInvoiceList() {
    this.isloading = true;
    let data = {
      date: this.date,
      search: this.search,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      payStatus: this.status,
      sort: this.sortBy
    }
    this._apiServices.getShipmentInvoiceList(data).subscribe(res => {
      if (res.isSuccess) {
        this.InvoiceList = res?.items;
        this.totalRecords = res?.totalRecords;
        this.isloading = false;
      } else {
        this.isloading = false;
      }
    })
  }

  searchInvoice(event: any) {
    this.pageNo = 1;
    this.getInvoiceList()
  }

  dowanloadInvoice(id: string) {
    this.isloading = true;
    // this._apiServices.dowanloadShipmentInvoice(id).subscribe(res => {
    //   if (res.isSuccess) {
    //     // const a: any = document.createElement('a');
    //     // a.href = res?.data?.downloadUrl;
    //     // document.body.appendChild(a);
    //     // a.style = 'display: none';
    //     // a.click();
    //     window.open(res?.data?.downloadUrl, "_blank");
    //     this.isloading = false;
    //   } else {
    //     this.isloading = false;
    //   }
    // })

    this.isloading = true;
    let data = this.url + ApiEndpoints.Invoices.downloadShipmentInvoice + '/' + id

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
    this._apiServices.payShipmentInvoice(data).subscribe(res => {
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

  getUnpaidInvoiceCount() {
    this._apiServices.getUnpaidCount().subscribe(res => {
      if (res?.isSuccess) {
        this.count = res?.data?.count
      }
    })
  }



}
