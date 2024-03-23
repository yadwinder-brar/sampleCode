import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuidedTour, GuidedTourService, Orientation } from 'ngx-guided-tour';
import { ApiEndpoints } from 'src/app/core/config/api-endpoints.config';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoice-mailbox',
  templateUrl: './invoice-mailbox.component.html',
  styleUrls: ['./invoice-mailbox.component.css'],
})
export class InvoiceMailboxComponent implements OnInit {
  url: any = environment.apiUrls.baseApiUrl;
  InvoiceList: any = [];
  date: string = '';
  count: any = '';
  paidStatus: string = '0';
  status: string = 'paid';
  isloading: boolean = false;
  sortBy: string = 'createdAt,DSC';
  totalRecords: any;
  search: string = '';
  pageNo: number = 1;
  pageSize: number = 10;
  constructor(
    private _apiServices: ApiService,
    private _toasterServices: ToasterService,
    private _activatedRoute: ActivatedRoute,
    private guidedTourService: GuidedTourService,
  ) {
    let sessionId =
      this._activatedRoute.snapshot.queryParamMap.get('sessionId');
    if (sessionId) {
      this.PaymentStatus(sessionId);
    }
    let invoiceType =
      this._activatedRoute.snapshot.queryParamMap.get('invoiceType');

    if (invoiceType == 'unpaid') {
      this.paidStatus = '1';
      this.status = invoiceType;
    }
   
  }

  public tourStart(): void {
    this.guidedTourService.startTour(this.TOUR);
  }

  ngOnInit(): void {
    this.getInvoiceList();
    this.getUnpaidInvoiceCount();
    setTimeout(() => {
      // this.tourStart();
    }, 1000)
  }

  getUnpaidInvoiceCount() {
    this._apiServices.getMailboxUnpaidCount().subscribe((res) => {
      if (res?.isSuccess) {
        // this.count= res?.data
        this.count = res?.data?.count;
        // this.count= res?.data
      }
    });
  }

  onTabChanged(event: any) {
    if (this.paidStatus == '1') {
      this.status = 'unpaid';
      this.getInvoiceList();
    } else {
      this.status = 'paid';
      this.getInvoiceList();
    }
  }

  getInvoiceList() {
    let data = {
      date: this.date,
      search: this.search,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      payStatus: this.status,
      sort: this.sortBy,
    };
    this._apiServices.getMailBoxInvoiceList(data).subscribe((res) => {
      if (res.isSuccess) {
        this.InvoiceList = res?.items;
        this.totalRecords = res?.totalRecords;
        
      }
     
    });
  
  }

  searchInvoice(event: any) {
    this.pageNo = 1;
    this.getInvoiceList();
  }

  dowanloadInvoice(id: string) {
    this.isloading = true;
    // this._apiServices.dowanloadMailboxInvoice(id).subscribe(res => {
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
    let data =
      this.url + ApiEndpoints.Invoices.downloadMailboxInvoice + '/' + id;

    window.open(data);
    this.isloading = false;
  }

  sortInvoices() {
    if (this.sortBy == 'createdAt,DSC') {
      this.sortBy = 'createdAt,ASC';
      this.pageNo = 1;
      this.getInvoiceList();
    } else {
      this.sortBy = 'createdAt,DSC';
      this.pageNo = 1;
      this.getInvoiceList();
    }
  }

  Pay(data: any) {
    if (data?.invoiceType == 'assignByAdmin') {
      this.isloading = true;
      this._apiServices.payAdminMailboxForward(data?.id).subscribe((res) => {
        if (res?.isSuccess) {
          let a = document.createElement('a');
          a.href = `${res?.data}`;
          a.click();
          this.isloading = false;
        } else {
          this.isloading = false;
        }
      });
    } else if (data?.invoiceType == 'plan') {
      this.isloading = true;
      this._apiServices.payAutomaticInvoice(data?.id).subscribe((res) => {
        if (res?.isSuccess) {
          let a = document.createElement('a');
          a.href = `${res?.data}`;
          a.click();
          this.isloading = false;
        } else {
          this.isloading = false;
        }
      });
    } else {
      this.isloading = true;
      this._apiServices.payForward(data?.id).subscribe((res) => {
        if (res?.isSuccess) {
          let a = document.createElement('a');
          a.href = `${res?.data}`;
          a.click();
          this.isloading = false;
        } else {
          this.isloading = false;
        }
      });
    }
  }

  PaymentStatus(sessionId: string) {
    this.isloading = true;
    let data = {
      url: sessionId,
    };
    this._apiServices.forwardPayment(data).subscribe((res) => {
      this.paidStatus = '1';
      this.status = 'unpaid';
      if (res?.isSuccess) {
        this._toasterServices.successToast('Payment Successful');
        this.getUnpaidInvoiceCount();
        this.isloading = false;
      } else {
        this.isloading = false;
        this._toasterServices.successToast('Payment failed');
      }
    });
  }


  private readonly TOUR: GuidedTour = {
    tourId: 'purchases-tour',
    useOrb: false,
    steps: [
      {
        title: 'Search input',
        selector: '.a',
        content: 'Search invoice from here.',
        orientation: Orientation.Bottom,
      },
      {
        title: 'Filter',
        selector: '.b',
        content: 'Filter invoice by date.',
        orientation: Orientation.Bottom,
      },
      {
        title: 'Paid & Unpaid',
        selector: '.tab-unpaid',
        content: 'Use this button to quickly view all the paid/Unpaid invoices.',
        orientation: Orientation.Bottom,
      },
      // {
      //   title: 'Unpaid',
      //   selector: '.unpaid-invoice',
      //   content: 'Use this button to quickly view all the unpaid invoices.',
      //   orientation: Orientation.Bottom,
      // },
    ],
  };




}
