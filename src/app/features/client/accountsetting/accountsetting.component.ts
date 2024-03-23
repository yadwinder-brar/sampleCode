
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, take } from 'rxjs';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { ApplicationForComponent } from './application-for/application-for.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-accountsetting',
  templateUrl: './accountsetting.component.html',
  styleUrls: ['./accountsetting.component.scss'],
})
export class AccountsettingComponent implements OnInit {
  userId: any;
  userData: any;
  userPlanDetail: any;
  tabIndex: number = 0;
  formUrl: any = '';
  firstProfImg: any = '';
  secProfImg: any = '';
  mailboxAccount: any;
  isLoading: boolean = false;
  constructor(
    private _authService: AuthService,
    private _apiServices: ApiService,
    private _activatedRoute: ActivatedRoute,
    private _toasterServices: ToasterService,
    private _router: Router,
    private dialog: MatDialog
  ) {
    this.userData = this._authService.getUserProfile();
    this.dataForm = this._authService.getApplicationFrom()
    let data = this.userData.profiles.filter(
      (e: any) => e.accountType == 'virtualMailBox'
    );
    this.mailboxAccount = data[0];
    this.userId = this._authService.getUserId();
    let currentTab = this._activatedRoute.snapshot.queryParamMap.get('tab');
    if (currentTab) {
      this.tabIndex = 1;
      this.getUserDetail();
    }
  }
  ngOnInit(): void {}
  upgradeAccount(type: string) {
    if (
      type !== 'shipment' &&
      (this.dataForm == '' || this.firstProfImg == '' || this.secProfImg == '')
    ) {
      let msg = ''
      this.dataForm==''?msg='Please fill the post office form':msg='Please upload docs'
      alert(msg);
      return;
    }
    this.isLoading = true;
    let data;
    type == 'shipment'
      ? (data = { accountType: type })
      : (data = {
          accountType: type,
          postOfficeForm: this.dataForm,
          proofDocument: {
            documents: [
              { name: 'firstProof', url: this.firstProfImg },
              { name: 'secondProof', url: this.secProfImg },
            ],
          },
        });
    this._apiServices
      .upgradeAccount(this.userId, data)
      .pipe(
        catchError((error) => {
          error ? (this.isLoading = false) : '';
          return EMPTY;
        }),
        take(1)
      )
      .subscribe((res) => {
        if (res?.isSuccess) {
          this._toasterServices.successToast('Request send successfully');
          this._authService.removeUserProfile();
          this._authService.removeApplicationFrom();
          this._authService.storeUserProfile(res?.data);
          window.location.reload();
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      });
  }
  selectFile(event: any) {
    this.formUrl = event[0];
  }
  proof1Upload(event: any) {
    this.firstProfImg = event[0];
  }
  proof2Upload(event: any) {
    console.log(event);
    this.secProfImg = event[0];
  }
  changeTab(e: any) {
    if (e.index == 1) {
      this._router.navigate(['/client/account-settings'], {
        queryParams: { tab: 'mailboxPlan' },
      });
      this.getUserDetail();
    }
  }
  getUserDetail() {
    this.isLoading = true;
    this._apiServices.getUserDetail(this.userData?.id).subscribe((res) => {
      if (res?.isSuccess) {
        this.userPlanDetail = res?.data?.userPlan;
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }
  dataForm: any;
  applicationOpen(data: any) {
    this.dialog
      .open(ApplicationForComponent, {
        maxWidth: '1000px',
        minWidth: '1000px',
        panelClass: 'dailogClass',
        data: {
          data
        }
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.dataForm = res;
        }
      });
  }
}
