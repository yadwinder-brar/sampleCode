import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  pageName: string = 'dashboard';
  copyRightYear = new Date()
  constructor() {

    localStorage.removeItem('shipmentId');
    localStorage.removeItem('carrierType');
    localStorage.removeItem('shipmentId1');
    localStorage.removeItem('additionalinfoForm');
    localStorage.removeItem('shipmentServices');
  }

  ngOnInit(): void {
  }
  get isSmallNav() {
    return localStorage.getItem('isSmall');
  }
  toggleSmallNav() {
    if (!this.isSmallNav) {
      localStorage.setItem('isSmall', 'true');
    } else {
      localStorage.removeItem('isSmall');
    }
  }

  tabs = [
    {
      navigation: 'dashboard',
      title: 'Dashboard',
      activeImg: '../assets/images/home.svg',
      grayImg: '../assets/images/home.svg',
      sub:[]
    },
    {
      navigation: 'customerlist',
      title: 'Customerlist/User List',
      activeImg: '../assets/images/admin/customer.svg',
      grayImg: '../assets/images/admin/customer.svg',
      sub:[]
    },
    {
      navigation: 'subAdmins',
      title: 'Sub-Admins',
      activeImg: '../assets/images/admin/customer.svg',
      grayImg: '../assets/images/admin/customer.svg',
      sub:[]
    },
    {
      navigation: 'shipments',
      title: 'Shipments',
      activeImg: '../assets/images/admin/shipping-fast.svg',
      grayImg: '../assets/images/admin/shipping-fast.svg',
      sub:[]
    },
    {
      navigation: 'shipment-request',
      title: 'Shipping Request',
      activeImg: '../assets/images/admin/shipping-fast.svg',
      grayImg: '../assets/images/admin/shipping-fast.svg',
      sub:[]
    },
    {
      navigation: 'mailbox',
      title: 'Mailbox',
      activeImg: '../assets/images/admin/mailbox.svg',
      grayImg: '../assets/images/admin/mailbox.svg',
      sub:[]
    },
    {
      navigation: 'mailboxrequest',
      title: 'Mailbox Request',
      activeImg: '../assets/images/admin/mailbox.svg',
      grayImg: '../assets/images/admin/mailbox.svg',
      sub:[]
    },
    {
      navigation: 'addresslist',
      title: 'Address List',
      activeImg: '../assets/images/admin/address-book.svg',
      grayImg: '../assets/images/admin/address-book.svg',
      sub:[]
    },
    {
      navigation: 'analyticsreports',
      title: 'Analytics and Reports',
      activeImg: '../assets/images/admin/analytics.svg',
      grayImg: '../assets/images/admin/analytics.svg',
      sub:[]
    },
    {
      navigation: 'invoicesbilling',
      title: 'Invoices/Billing',
      activeImg: '../assets/images/admin/invoices.svg',
      grayImg: '../assets/images/admin/invoices.svg',
      sub:[]
    },
    {
      navigation: 'subAdmin-invoices',
      title: 'Sub-admin Invoices',
      activeImg: '../assets/images/admin/invoices.svg',
      grayImg: '../assets/images/admin/invoices.svg',
      sub:[]
    },
    {
      title: 'Configuration',
      activeImg: '../assets/images/admin/configuration-menu.svg',
      grayImg: '../assets/images/admin/configuration-menu.svg',
      sub:[{
        navigation: 'carrier',
        title: 'Carrier',
        activeImg: '../assets/images/admin/employee-carrier.svg',
        grayImg: '../assets/images/admin/employee-carrier.svg',
      },
      { navigation: 'plan',
      title: 'Plan',
      activeImg: '../assets/images/admin/plan.svg',
      grayImg: '../assets/images/admin/plan.svg'},
      {
        navigation: 'margindiscount',
        title: 'Margin & Discount',
        activeImg: '../assets/images/admin/margin.svg',
        grayImg: '../assets/images/admin/margin.svg',
      },
    ]
    },
    {
      navigation: 'faq',
      title: 'FAQs',
      activeImg: '../assets/images/admin/support-service.svg',
      grayImg: '../assets/images/admin/support-service.svg',
      sub:[]
    },
  ];



  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }
}
