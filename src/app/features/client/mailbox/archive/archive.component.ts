import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ConfirmationComponent } from 'src/app/features/confirmation/confirmation.component';
import { RequestChangeDialogComponent } from '../request-change-dialog/request-change-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, EMPTY, take } from 'rxjs';
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  isLoading: boolean = false;
  profileId: any
  archivedDate = '';
  archivedType = '';
  maxDate = new Date();
  totalRecords: any;
  search: string = '';
  pageNo: number = 1;
  pageSize: number = 10;
  archivedList: any = [];
  constructor(private _apiServices: ApiService,
    private dialog: MatDialog,
    public sanitizer: DomSanitizer,
    private _authServices: AuthService,
    private _toasterService: ToasterService) {

    let profileId = this._authServices.getUserProfile();
    this.profileId = profileId?.profiles.filter((e: any) => e.accountType == 'virtualMailBox');
  }

  ngOnInit(): void {
    this.getArchiveList();
  }
  getArchiveList() {
    let data = {
      search: this.search,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      date: this.archivedDate,
      status: 'archived',
      type: this.archivedType,
      profileId: this.profileId[0]?.id
    }
    this.isLoading = true;
    this._apiServices.getMailArchiveList(data).subscribe(res => {

      if (res?.isSuccess) {
        this.archivedList = res?.items;
        this.totalRecords = res?.totalRecords
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    })
  }
  sendToTrash(id: any) {
    this.dialog.open(ConfirmationComponent, {
      maxWidth: '390px',
      minWidth: '390px',
      panelClass: 'dailogClass',
      data: {
        title: 'Send To Trash',
        panelClass: 'dailogClass',
        description: 'Are you sure you want to send mail to trash?',
      },
    })
      .afterClosed().subscribe(res => {
        if (res) {
          let data = {
            labelIds: [id]
          }
          this.isLoading = true;
          this._apiServices.sendInTrash(data).subscribe(res => {
            if (res?.isSuccess) {
              this._toasterService.successToast('Mail send to trash successfully')
              this.getArchiveList();
            } else {
              this.isLoading = false;
            }
          })
        }
      })

  }

  viewImg(data: any) {
    window.open(data?.labelLink, "_blank")
  }
  notMyMail(id: any) {
    this.dialog.open(ConfirmationComponent, {
      maxWidth: '390px',
      minWidth: '390px',
      panelClass: 'dailogClass',
      data: {
        title: 'Not My Mail',
        panelClass: 'dailogClass',
        description: 'Are you sure this mail doesnot belongs to you?',
      },
    })
      .afterClosed().subscribe(res => {
        if (res) {
          let data = {
            labelIds: [id]
          }
          this.isLoading = true;
          this._apiServices.notMyMail(data).subscribe(res => {
            if (res?.isSuccess) {
              this._toasterService.successToast('Mail removed successfully');
              this.getArchiveList();
            } else {
              this.isLoading = false;
            }
          })
        }
      })

  }
  makeRequestChange(data: any) {
    this.dialog.open(RequestChangeDialogComponent, {
      maxWidth: '85%',
      minWidth: '85%',
      panelClass: 'dailogClass',
      data: { data: data, type: 'archive' },
    })
      .afterClosed().subscribe(res => {
        if (res) {
          this.getArchiveList();
        }
      })
  }
  getImageName(img: string): any {
    // let img = "html/data/img.pdf"
    let data = img.split(".");
    let type = data[data.length - 1]
    return type;
  }


  getName(data: any) {
    switch (data) {
      case 'fiveToSevenDays': return '5-7 days';
      case 'threeToFourDays': return '3-4 days';
      case 'twoToThreeDays': return '2-3 days';
      case 'oneDayDays': return '1 day';
      case 'SameDayDelivery': return 'same day delivery';
      default: return '';
    }
  }
  cancelMultipleForward(data: any) {
    let item = {
      parentLabelId:data?.id,
      labelIds:data?.childLabels,
      type:'cancel'
    }
    this._apiServices.forwardMultipleMail(item).pipe(
      catchError((error) => {
        error ? this.isLoading = false : ''
        this._toasterService.errorToast(error?.message);
        return EMPTY;
      }), take(1)).subscribe((res: any) => {
      if (res.isSuccess) {
          this.getArchiveList();
       this.isLoading= false
      }else{
        this.isLoading= false
      }
    })
  }
}
