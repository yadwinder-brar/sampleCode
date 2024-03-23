import {
  AfterContentChecked,
  Component,
  DoCheck,
  HostListener,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { InvoicePayComponent } from './invoice-pay/invoice-pay.component';
import { GuidedTour, GuidedTourService, Orientation } from 'ngx-guided-tour';
import { StepTourService } from 'src/app/core/services/tour.service';
import { JoyrideService } from 'ngx-joyride';
import { EMPTY, catchError, take } from 'rxjs';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let size = window.innerWidth;

    if (size < 768) {
      localStorage.setItem('isSmall', 'true');
    } else {
      localStorage.removeItem('isSmall');
    }
  }
  tabs: any;
  routeData: any;
  userData: any;
  virtualProfile: any;
  shipmentProfile: any;
  currentRoute: any;
  pageName: string = 'dashboard';
  dashboardType: string = '';

  copyRightYear = new Date();
  constructor(
    private readonly joyrideService: JoyrideService,
    private router: Router,
    private dialog: MatDialog,
    private _apiServices: ApiService,
    private _authService: AuthService,
    private _toasterService: ToasterService
  ) {
    this.userData = this._authService.getUserProfile();
    this.virtualProfile = this.userData?.profiles.filter(
      (e: any) => e.accountType == 'virtualMailBox'
    );
    this.shipmentProfile = this.userData?.profiles.filter(
      (e: any) => e.accountType == 'shipment'
    );
    // this.isPurchaseCancel= localStorage.getItem('cancelPurchase')
    if (this.userData?.profiles && this.userData?.profiles.length > 1) {
      if (
        this.shipmentProfile[0]?.isShipmentAccountVerified ||
        this.virtualProfile[0]?.isMailBoxAccountVerified
      ) {
        if (this.shipmentProfile[0]?.isShipmentAccountVerified) {
          this.dashboardType = 'shipment';
        } else {
          this.dashboardType = 'mailBox';
          localStorage.setItem('userAccountType', this.dashboardType);
        }
      }
    } else if (this.userData?.profiles && this.userData?.profiles.length == 1) {
      this.dashboardType = this.userData?.profiles[0]?.accountType;
      this.tabs = [];
      this.tabs = this.mailBoxTabs;
    }

    if (
      !this.userData?.isPlanPurchased &&
      !this.userData?.isPlanExist &&
      this.virtualProfile[0]?.accountType == 'virtualMailBox' &&
      !this.shipmentProfile[0]?.isShipmentAccountVerified
    ) {
      this.router.navigate(['client/selectplan']);
      return;
    }

    if (
      !this.userData?.isPlanPurchased &&
      this.userData?.isPlanExist &&
      this.virtualProfile[0]?.accountType == 'virtualMailBox'
    ) {
      // if (!this.userData?.isPlanPurchased && this.userData?.isPlanExist && this.virtualProfile[0]?.accountType == 'virtualMailBox' && this.shipmentProfile.length == 0) {
      // this.openSelect();
    }
    localStorage.removeItem('shipmentId');
    localStorage.removeItem('carrierType');
    localStorage.removeItem('additionalinfoForm');
    localStorage.removeItem('shipmentServices');
    this.dashboardType = localStorage.getItem('userAccountType') || 'shipment';
    //  this._activeRoute.url.subscribe(data=>{
    //   this.routeData = data;
    //  })
    this.currentRoute = '';
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show progress spinner or progress bar
        //  console.log('Route change detected');
      }

      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        this.currentRoute = event.url;
        //  console.log(event);
      }

      if (event instanceof NavigationError) {
        // Hide progress spinner or progress bar
        // Present error to user
        //  console.log(event.error);
      }
    });
  }
  changeAccountTypeMobile(event: any) {
    this.dashboardType = event;
    if (this.dashboardType === 'shipment') {
      this.tabs = [];
      this.tabs = this.shipmentTabs;
      localStorage.setItem('userAccountType', 'shipment');
      this.router.navigate(['client/dashboard']);
      this.onClick();
    } else {
      this.tabs = [];
      this.tabs = this.mailBoxTabs;
      if (this.userData?.isPlanPurchased) {
        this.dashboardType === 'mailBox';
        localStorage.setItem('userAccountType', 'mailBox');
        this.router.navigate(['client/mailbox-dashboard']);
        this.getUserScanCount();
        this.onMailBoxClick();
      } else {
        if (!this.userData?.isPlanExist) {
          this.dashboardType === 'mailBox';
          this.router.navigate(['client/selectplan']);
        } else {
          this.router.navigate(['client/mailbox-dashboard']);
        }
      }
      if (!this.userData?.isPlanPurchased && this.userData?.isPlanExist) {
        // this.openSelect();
      }
    }
  }
  changeAccountType(event: any) {
    this.dashboardType = event?.value;
    if (this.dashboardType === 'shipment') {
      this.tabs = [];
      this.tabs = this.shipmentTabs;
      localStorage.setItem('userAccountType', 'shipment');
      this.router.navigate(['client/dashboard']);
      this.onClick();
      // this.updateShipmentTour()
    } else {
      this.tabs = [];
      this.tabs = this.mailBoxTabs;
      if (this.userData?.isPlanPurchased) {
        this.dashboardType === 'mailBox';
        localStorage.setItem('userAccountType', 'mailBox');
        this.router.navigate(['client/mailbox-dashboard']);
        this.getUserScanCount();
        this.onMailBoxClick();
      } else {
        if (!this.userData?.isPlanExist) {
          this.dashboardType === 'mailBox';
          this.router.navigate(['client/selectplan']);
        } else {
          this.router.navigate(['client/mailbox-dashboard']);
        }
      }
      if (!this.userData?.isPlanPurchased && this.userData?.isPlanExist) {
        // this.openSelect();
      }
    }
  }

  shipmentTabs = [
    {
      navigation: 'dashboard',
      title: 'Dashboard',
      activeImg: '../assets/images/home.svg',
      grayImg: '../assets/images/home.svg',
      joyrideStep: 'firstStep',
      customContent:
        'The dashboard is where you can see your account data at a glance, whether it is for your shipping or mailbox account.',
    },
    {
      navigation: 'shipments',
      title: 'Shipments',
      activeImg: '../assets/images/shipping-fast.svg',
      grayImg: '../assets/images/shipping-fast.svg',
      joyrideStep: 'secondStep',
      customContent:
        'This page shows all previous shipments. Filters can also be added to show pending, in transit, delivered, and cancelled shipments.',
    },
    {
      navigation: 'address-List',
      title: 'Address List',
      activeImg: '../assets/images/address-book.svg',
      grayImg: '../assets/images/address-book.svg',
      joyrideStep: 'thirdStep',
      customContent:
        'This page shows all of the contacts that have been added manually or added automatically from creating shipments to these contacts. Contacts in the Address List can also be used to create shipments faster as when typing in their name as a receiver, their information will automatically fill in so that it does not have to be retyped.',
    },
    {
      navigation: 'packages',
      title: 'Packages',
      activeImg: '../assets/images/logistics.svg',
      grayImg: '../assets/images/logistics.svg',
      joyrideStep: 'fourthStep',
      customContent:
        'This page contains all packages saved either manually or automatically when you name them in the Select Package field on the Package Information page.',
    },
    {
      navigation: 'invoices',
      title: 'Invoices',
      activeImg: '../assets/images/control-over-invoices-6.svg',
      grayImg: '../assets/images/control-over-invoices-6.svg',
      joyrideStep: 'fifthStep',
      customContent:
        'This page will show all paid and unpaid invoices for which ever account you are in. When in the Shipment Account you will only see Shipment Invoices. When in the Mailbox Account, you will only see Mailbox Invoices.',
    },
    {
      navigation: 'account-settings',
      title: 'Account Settings',
      activeImg: '../assets/images/account-service.svg',
      grayImg: '../assets/images/account-service.svg',
      joyrideStep: 'sixStep',
      customContent:
        'On this page, you can see the account settings of every account you have associated with the website. You can also upgrade to have both a Shipping and Mailbox Account if you only have one of them. Even though you select the upgrade button, you will still need to be approved to have that account by the Admin.',
    },
  ];
  onSkip(){
    this.dashboardType == 'shipment' ?  this.updateShipmentTour():this.updateMailBoxTour();
  }
  onClick() {
    if (this.userData?.isLoginFirstTime?.shipmentTour == 'first') {
      this.joyrideService
        .startTour({
          steps: [
            'seventhStep',
            'eighthStep',
            'ninthStep',
            'firstStep',
            'secondStep',
            'thirdStep',
            'fourthStep',
            'fifthStep',
            'sixStep',
            'help',
            'email',
          ],
          showCounter: false,
          showPrevButton: false,
          stepDefaultPosition: 'bottom',
          //  themeColor: 'Backdrop',
          customTexts: { next: 'Next', done: 'Complete' },
        })
        .subscribe((step) => {
          if (step.name == 'email') {
            this.updateShipmentTour();
          }
        });
    }
  }

  updateShipmentTour() {
    const data = {
      isLoginFirstTime: {
        mailBoxTour:this.userData?.isLoginFirstTime.mailBoxTour,
        shipmentTour: 'notFirst',
      },
    };
    let id = this._authService.getUserId();
    this._apiServices
      .updateUserTour(id, data)
      .pipe(
        catchError((error: any) => {
          this._toasterService.errorToast(error?.message);
          return EMPTY;
        }),
        take(1)
      )
      .subscribe((res) => {
        if(res?.data?.isLoginFirstTime?.shipmentTour == 'notFirst'){
          this._authService.storeUserProfile(res?.data);
        }
      });
  }

  updateMailBoxTour() {
    
    const data = {
      isLoginFirstTime: {
        shipmentTour:this.userData?.isLoginFirstTime?.shipmentTour,
        mailBoxTour: 'notFirst',
      },
    };
    let id = this._authService.getUserId();
    this._apiServices
      .updateUserTour(id, data)
      .pipe(
        catchError((error: any) => {
          this._toasterService.errorToast(error?.message);
          return EMPTY;
        }),
        take(1)
      )
      .subscribe((res) => {
        if(res?.data?.isLoginFirstTime?.mailBoxTour == 'notFirst'){
          this._authService.storeUserProfile(res?.data);
        }
      });
  }

  mailBoxTabs = [
    {
      navigation: 'mailbox-dashboard',
      title: 'Dashboard',
      activeImg: '../assets/images/home.svg',
      grayImg: '../assets/images/home.svg',
      joyrideStep: 'mail',
      customContent:
        'The dashboard is where you can see your account data at a glance, whether it is for your shipping or mailbox account.',
    },
    {
      navigation: 'inbox',
      title: 'Inbox',
      activeImg: '../assets/images/inbox-mailbox.svg',
      grayImg: '../assets/images/inbox-mailbox.svg',
      joyrideStep: 'inb',
      customContent:
        'The inbox contains all of the scans that have been sent to you by the Admin. Anything in your inbox needs to be answered, if it is in your inbox, that means the admin is waiting on you to choose an action for the scans.',
    },
    {
      navigation: 'archive',
      title: 'Archive',
      activeImg: '../assets/images/archive-mailbox.svg',
      grayImg: '../assets/images/archive-mailbox.svg',
      joyrideStep: 'arc',
      customContent:
        'The Archive is for all mail items that have an action selected that either the Admin still needs to answer, or has been answered completely by the admin and you are either soon to be or in possession of the item scanned.',
    },
    {
      navigation: 'trash',
      title: 'Trash',
      activeImg: '../assets/images/trash-mailbox.svg',
      grayImg: '../assets/images/trash-mailbox.svg',
      joyrideStep: 'tras',
      customContent:
        'The trash page is for all items that you have selected to send to trash. Once items are in the trash can, you cannot make changes to these items. The admin will return to sender, dispose of or shred the items in the trash can on the specified date. Items sent to the trash will automatically give you a scan back.',
    },
    {
      navigation: 'mailbox-invoices',
      title: 'Invoices',
      activeImg: '../assets/images/control-over-invoices-6.svg',
      grayImg: '../assets/images/control-over-invoices-6.svg',
      joyrideStep: 'mailboxin',
      customContent:
        'This page will show all paid and unpaid invoices for which ever account you are in. When in the Shipment Account you will only see Shipment Invoices. When in the Mailbox Account, you will only see Mailbox Invoices.',
    },
    {
      navigation: 'account-settings',
      title: 'Account Settings',
      activeImg: '../assets/images/account-service.svg',
      grayImg: '../assets/images/account-service.svg',
      joyrideStep: 'accset',
      customContent:
        'On this page, you can see the account settings of every account you have associated with the website. You can also upgrade to have both a Shipping and Mailbox Account if you only have one of them. Even though you select the upgrade button, you will still need to be approved to have that account by the Admin.',
    },
  ];

  onMailBoxClick() {
    if (this.userData?.isLoginFirstTime?.mailBoxTour == 'first') {
      this.joyrideService
        .startTour({
          steps: [
            'inboxStep',
            'archiveStep',
            'trashStep',
            'mail',
            'inb',
            'arc',
            'tras',
            'mailboxin',
            'accset',
            'help',
            'email',
          ],
          showCounter: false,
          showPrevButton: false,
          stepDefaultPosition: 'bottom',
          customTexts: { next: 'Next', done: 'Complete' },
        })
        .subscribe((step) => {
          if (step.name == 'email') {
            this.updateMailBoxTour();
          }
        });
    }
  }

  ngOnInit(): void {
    if (this.currentRoute == '/client/mailbox-dashboard') {
      localStorage.setItem('userAccountType', 'mailBox');
      this.dashboardType = 'mailBox';
      this.tabs = [];
      this.tabs = this.mailBoxTabs;
    } else {
      if (this.dashboardType == 'shipment') {
        this.dashboardType = 'shipment';
        this.tabs = [];
        this.tabs = this.shipmentTabs;
        localStorage.setItem('userAccountType', 'shipment');
      } else {
        this.dashboardType = 'mailBox';
        localStorage.setItem('userAccountType', 'mailBox');
        this.tabs = [];
        this.tabs = this.mailBoxTabs;
      }
    }
    this.onResize(event);
    setTimeout(() => {
      this.dashboardType == 'shipment' ? this.onClick() : this.onMailBoxClick();
    }, 500);
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
  ngAfterViewInit(): void {
    this.dashboardType != 'shipment'
      ? this.getUserScanCount()
      : this.getShipmentUnpaidInvoice();
  }
  getShipmentUnpaidInvoice() {
    this._apiServices.getUnpaidCount().subscribe((res) => {
      if (res?.isSuccess) {
        let count = res?.data?.count;
        if (count > 0) {
          this.openPayShipmentInvoice();
        }
        if (res.data?.leftScanCount <= 1) {
          this.openScanPurchase();
        }
      }
    });
  }

  getUnpaidMailboxInvoiceCount() {
    this._apiServices.getMailboxUnpaidCount().subscribe((res) => {
      if (res?.isSuccess) {
        let mailboxUnPaidCount = res?.data?.count;
        if (mailboxUnPaidCount > 0) {
          this.openMailboxPayInvoice();
        }
      }
    });
  }
  getUserScanCount() {
    this.getUnpaidMailboxInvoiceCount();
    this._apiServices.getUserScanCount().subscribe((res) => {
      if (res?.isSuccess) {
        let isPlanExpired = res?.data?.isPlanExpired;
        // if (isPlanExpired) {
        //   this.openMailboxPayInvoice();
        // }
        if (res.data?.leftScanCount <= 1) {
          this.openScanPurchase();
        }
      }
    });
  }

  openMailboxPayInvoice() {
    this.dialog
      .open(InvoicePayComponent, {
        maxWidth: '390px',
        minWidth: '390px',
        panelClass: 'dailogClass',
        disableClose: true,
        data: {
          title: 'Mandatory Mailbox Invoice',
          panelClass: 'dailogClass',
          description:
            'You have Mandatory Invoice to pay. Click confirm to head to the invoice page.',
          hideClose: true,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/client/mailbox-invoices'], {
            queryParams: { invoiceType: 'unpaid' },
          });
        }
      });
  }
  openPayShipmentInvoice() {
    this.dialog
      .open(InvoicePayComponent, {
        maxWidth: '390px',
        minWidth: '390px',
        panelClass: 'dailogClass',
        disableClose: true,
        data: {
          title: 'Mandatory Shipment Invoice',
          panelClass: 'dailogClass',
          description:
            'You have Mandatory Invoice to pay. Click confirm to head to the invoice page.',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/client/invoices'], {
            queryParams: { invoiceType: 'unpaid' },
          });
        }
      });
  }

  // getUserScanCount() {
  //   this._apiServices.getUserScanCount().subscribe(res => {
  //     if (res?.isSuccess) {
  //       let isPlanExpired = res?.data?.isPlanExpired;
  //       if(res.data?.leftScanCount<=1){
  //         this.openScanPurchase();
  //       }
  //       // if (isPlanExpired) {
  //       //   this.openSelect();
  //       // }
  //     }
  //   })

  // }
  openScanPurchase() {
    this.dialog
      .open(ConfirmationComponent, {
        maxWidth: '390px',
        minWidth: '390px',
        panelClass: 'dailogClass',
        data: {
          title: 'Scan count',
          panelClass: 'dailogClass',
          description:
            'You may have more mail or packages. click confirm to purchase scans, and the ability to provide instructions.',
          hideClose: true,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['client/selectplan']);
        }
      });
  }
  openSelect() {
    this.dialog
      .open(InvoicePayComponent, {
        maxWidth: '390px',
        minWidth: '390px',
        panelClass: 'dailogClass',
        data: {
          title: 'Mandatory Invoice',
          panelClass: 'dailogClass',
          description:
            'You have Mandatory Invoice to pay. Click confirm to head to the invoice page.',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/client/invoices'], {
            queryParams: { invoiceType: 'unpaid' },
          });
        }
      });
  }

  get isSmall() {
    return localStorage.getItem('isSmall');
  }
}
