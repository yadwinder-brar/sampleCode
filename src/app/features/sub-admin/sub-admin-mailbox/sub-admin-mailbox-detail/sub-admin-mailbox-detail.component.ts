import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { ToasterService } from 'src/app/core/services';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadscanComponent } from 'src/app/features/admin/uploadscan/uploadscan.component';
import { UploadScanImgaesComponent } from 'src/app/features/admin/mailbox/upload-scan-imgaes/upload-scan-imgaes.component';
import { AddMailboxCountComponent } from 'src/app/features/admin/mailbox/mailboxdetail/add-mailbox-count/add-mailbox-count.component';
@Component({
  selector: 'app-sub-admin-mailbox-detail',
  templateUrl: './sub-admin-mailbox-detail.component.html',
  styleUrls: ['./sub-admin-mailbox-detail.component.css'],
})
export class SubAdminMailboxDetailComponent implements OnInit {
  inputConfig = {
    length: 5,
    disableAutoFocus: true,
    allowNumbersOnly: true,
    inputStyles: {
      borderRadius: ` 10px`,
      outline: 'none',
      textAlign: 'center',
      width: ' 50px',
      height: ' 50px',
      color: '#474849',
      border: ' 2px solid #8888881A',
      backgroundColor: '#fff',
      fontSize: '20px',
      fontWeight: '600',
      marginright: '30px',
    },
  };
  verificationCode: any = '';
  uniqueId: any = '';
  profileId = '';
  userMailboxRequestList: any = [];
  isLoading: boolean = false;
  loader: boolean = false;
  onOtpChange(e: any) {
    this.verificationCode = e;
  }
  constructor(
    public sanitizer: DomSanitizer,
    private _route: ActivatedRoute,
    private _router: Router,
    private dialog: MatDialog,
    private _apiService: ApiService,
    private _toasterServices: ToasterService
  ) {
    this.profileId = this._route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getProfileData();
    this.getDetail();
  }
  getDetail() {
    this.isLoading = true;
    this._apiService.getUserMailboxDetail(this.profileId).subscribe((res) => {
      if (res?.isSuccess) {
        this.userMailboxRequestList = res?.items;
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }

  openImg(data: any) {
    window.open(data?.labelLink, '_blank');
  }
  uploadScan() {
    const dialogRef = this.dialog.open(UploadscanComponent, {
      width: '40%',
      height: '370px',
      panelClass: 'upload',
      disableClose: true,
      data: { uniqueId: this.uniqueId },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getDetail();
      }
    });
  }
  verifyCode(id: any) {
    if (this.verificationCode?.length >= 5) {
      this.loader = true;
      let data = {
        otp: this.verificationCode,
      };
      try {
        this._apiService.verifyOtp(data, id).subscribe((res) => {
          if (res?.isSuccess) {
            this.loader = false;
            this.getDetail();
            this._toasterServices.successToast(
              'Shipment Picked Up successfully'
            );
          } else {
            this.loader = false;
            // this.verificationCode = '';
            // this._toasterServices.errorToast('otp invalid')
          }
        });
      } catch (error: any) {
        this._toasterServices.errorToast(error);
        this.loader = false;
      }
    } else {
      alert('please enter full code');
    }
  }

  respondToScanRequest(data: any) {
    const dialogRef = this.dialog.open(UploadScanImgaesComponent, {
      width: '80%',
      height: '350px',
      panelClass: 'clickview',
      data: { uniqueId: data?.id, profileId: this.profileId },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getDetail();
      }
    });
  }

  respondToForwardRequest(data: any) {
    this._router.navigate(['/forwardmailboxdetail/']);
  }

  getProfileData() {
    this._apiService.getMailboxProfile(this.profileId).subscribe((res) => {
      if (res?.isSuccess) {
        this.uniqueId = res?.data?.virtualId;
      }
    });
  }

  getImageName(img: string): any {
    // let img = "html/data/img.pdf"
    let data = img.split('.');
    let type = data[data.length - 1];
    return type;
  }

  openScanReturnDialogBox(data: any) {
    const dialogRef = this.dialog.open(AddMailboxCountComponent, {
      width: '450px',
      height: '250px',
      panelClass: 'dialogClass',
      data: { data: data },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getDetail();
      }
    });
  }

  cancelMailbox(data: any) {
    this.isLoading = true;
    this._apiService.cancelMailboxScan(data?.id).subscribe((res) => {
      if (res?.isSuccess) {
        this.getDetail();
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }
  MarkAsPickedUp(data: any) {
    this.isLoading = true;
    this._apiService.MarkAsPickup(data?.id).subscribe((res) => {
      if (res?.isSuccess) {
        this.getDetail();
        // this.isLoading = false
      } else {
        this.isLoading = false;
      }
    });
  }
}
