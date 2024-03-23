import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/core/config';
import { AuthService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { BankDetailUpdateComponent } from './bank-detail-update/bank-detail-update.component';
@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.css']
})
export class SubAdminComponent implements OnInit {
  pageName: string = 'dashboard';
  superAdmin: boolean = false
  isLoading: boolean = false
  copyRightYear = new Date()
  userData: any;
  constructor(
    private router: Router,
    private dialog:MatDialog ,
    private _authService: AuthService,
  ) {
    this.userData = this._authService.getUserProfile();   
    
    let superAdminData: any = localStorage.getItem('adminToken') || '';
    superAdminData ? this.superAdmin = true : this.superAdmin = false
    let profile: any = localStorage.getItem(StorageKeys.CurrentProfile)
    let stripeId = profile?.stripeCustomAccountId
    
    // if (!stripeId && (!superAdminData || superAdminData=='')) {
    //   this.dialog.open(BankDetailUpdateComponent, {
    //     width: '450px',
    //     height: '250px',
    //     disableClose: false
    //   })
      // .afterClosed().subscribe(data => {
        
      // })
    // }
  }

  ngOnInit(): void {
  }

  backToSuperAdmin() {
    this.isLoading=true
    let adminToken: any = localStorage.getItem('adminToken');
    let adminProfile = this._authService.getAdminProfile();
    localStorage.clear();
    this._authService.storeUserProfile(adminProfile);
    this._authService.storeUserId(adminProfile?.id);
    this._authService.storeAuthToken(adminToken);
    this.router.navigate(['/admin/subAdmins'])
this.isLoading=false
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
      sub: []
    },
    {
      navigation: 'customerlist',
      title: 'Customerlist',
      activeImg: '../assets/images/admin/customer.svg',
      grayImg: '../assets/images/admin/customer.svg',
      sub: []
    },
    // {
    //   navigation: 'shipments',
    //   title: 'Shipments',
    //   activeImg: '../assets/images/admin/shipping-fast.svg',
    //   grayImg: '../assets/images/admin/shipping-fast.svg',
    //   sub:[]
    // },
    // {
    //   navigation: 'shipment-request',
    //   title: 'Shipping Request',
    //   activeImg: '../assets/images/admin/shipping-fast.svg',
    //   grayImg: '../assets/images/admin/shipping-fast.svg',
    //   sub:[]
    // },
    {
      navigation: 'mailbox',
      title: 'Mailbox',
      activeImg: '../assets/images/admin/mailbox.svg',
      grayImg: '../assets/images/admin/mailbox.svg',
      sub: []
    },
    {
      navigation: 'mailbox-request',
      title: 'Mailbox Request',
      activeImg: '../assets/images/admin/mailbox.svg',
      grayImg: '../assets/images/admin/mailbox.svg',
      sub: []
    },
    {
      navigation: 'mandatry-invoice',
      title: 'Mandatory Invoices',
      activeImg: '../assets/images/admin/mailbox.svg',
      grayImg: '../assets/images/admin/mailbox.svg',
      sub: []
    },
    // {
    //   navigation: 'addresslist',
    //   title: 'Address List',
    //   activeImg: '../assets/images/admin/address-book.svg',
    //   grayImg: '../assets/images/admin/address-book.svg',
    //   sub:[]
    // },
    // {
    //   navigation: 'analyticsreports',
    //   title: 'Analytics and Reports',
    //   activeImg: '../assets/images/admin/analytics.svg',
    //   grayImg: '../assets/images/admin/analytics.svg',
    //   sub:[]
    // },
    {
      navigation: 'invoices',
      title: 'Invoices/Billing',
      activeImg: '../assets/images/admin/invoices.svg',
      grayImg: '../assets/images/admin/invoices.svg',
      sub: []
    },
    {
      title: 'Configuration',
      activeImg: '../assets/images/admin/configuration-menu.svg',
      grayImg: '../assets/images/admin/configuration-menu.svg',
      sub: [
        //   {
        //   navigation: 'carrier',
        //   title: 'Carrier',
        //   activeImg: '../assets/images/admin/employee-carrier.svg',
        //   grayImg: '../assets/images/admin/employee-carrier.svg',
        // },
        {
          navigation: 'plan',
          title: 'Plan',
          activeImg: '../assets/images/admin/plan.svg',
          grayImg: '../assets/images/admin/plan.svg'
        },
        // {
        //   navigation: 'salesTax',
        //   title: 'Sales Tax',
        //   activeImg: '../assets/images/admin/margin.svg',
        //   grayImg: '../assets/images/admin/margin.svg',
        // },
        {
          navigation: 'account-settings',
          title: 'Account Settings',
          activeImg: '../assets/images/account-service.svg',
          grayImg: '../assets/images/account-service.svg',
        },
      ]
    },
    // {
    //   navigation: 'faq',
    //   title: 'FAQs',
    //   activeImg: '../assets/images/admin/support-service.svg',
    //   grayImg: '../assets/images/admin/support-service.svg',
    //   sub:[]
    // },
    // {
    //   navigation: 'account-settings',
    //   title: 'Account Settings',
    //   activeImg: '../assets/images/account-service.svg',
    //   grayImg: '../assets/images/account-service.svg',
    //   sub:[]
    // },
  ];

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }
}
