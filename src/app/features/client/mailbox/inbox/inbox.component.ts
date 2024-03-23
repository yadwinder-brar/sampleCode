import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClickviewComponent } from '../clickview/clickview.component';
import { OpenmodalComponent } from '../openmodal/openmodal.component';
import { ApiService, ToasterService } from 'src/app/core/services';
import { ConfirmationComponent } from 'src/app/features/confirmation/confirmation.component';
import { HoldpickupComponent } from 'src/app/features/add-shipment/holdpickup/holdpickup.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
export interface InboxList {
  isSelected?: boolean;
}
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})

export class InboxComponent implements OnInit {
  isLoading: boolean = false;
  inboxDate = '';
  InboxType = '';
  maxDate = new Date();
  totalRecords: any;
  search: string = '';
  pageNo: number = 1;
  pageSize: number = 10;
  InboxList: InboxList[] = [];
  labelIds: string[] = [];
  onOtpChange(e: any) {

  }
  constructor(private dialog: MatDialog,
    public sanitizer: DomSanitizer,
    private _apiServices: ApiService,
    private _router: Router,
    private _toasterService: ToasterService) {
  }

  ngOnInit(): void {
    this.getInboxList();
  }
  checkMailbox(e: any, id: string, data: InboxList) {
    if (e?.checked) {
      this.labelIds.push(id);
    } else {
      const idIndex = this.labelIds.findIndex(z => z == id);
      if (idIndex > -1) this.labelIds.splice(idIndex, 1);
    }

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(OpenmodalComponent, {
      width: '450px',
      height: '240px',
      panelClass: 'inbox',


    });

  }
  clickview(): void {
    const dialogRef = this.dialog.open(ClickviewComponent, {
      width: '100%',
      height: '340px',
      panelClass: 'clickview',
      position: { bottom: '0px' }
    }).afterClosed().subscribe((e: any) => {

    })

  }
  searchInboxList() {
    this.pageNo = 1;
    this.getInboxList();
  }
  getInboxList() {
    this.labelIds = [];
    let data = {
      search: this.search,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      date: this.inboxDate,
      type: this.InboxType,
      status: 'active'
    }
    this.isLoading = true;
    this._apiServices.getMailInboxList(data).subscribe(res => {

      if (res?.isSuccess) {
        this.InboxList = res?.items;
        this.totalRecords = res?.totalRecords
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    })
  }

  notMyMail(id: any) {
    this.dialog.open(ConfirmationComponent, {
      maxWidth: '390px',
      minWidth: '390px',
      panelClass: 'dailogClass',
      data: {
        title: 'Not My Mail',
        panelClass: 'dailogClass',
        description: 'Are you sure this mail does not belong to you?',
      },
    })
      .afterClosed().subscribe(res => {
        if (res) {
          let data = {
            labelIds: [id]
          }
          let items = {
            labelIds: this.labelIds
          }
          this.isLoading = true;
          this._apiServices.notMyMail(id ? data : items).subscribe(res => {
            if (res?.isSuccess) {
              this._toasterService.successToast('Mail removed successfully');
              this.getInboxList();
              this.labelIds = [];
              this.isLoading = false
            } else {
              this.isLoading = false;
            }
          })
        }
      })

  }

  getImageName(img: string): any {
    // let img = "html/data/img.pdf"
    let data = img.split(".");
    let type = data[data.length - 1]
    return type;
  }
  sendToTrash(id: any) {
    this.dialog.open(ConfirmationComponent, {
      maxWidth: '390px',
      minWidth: '390px',
      panelClass: 'dailogClass',
      data: {
        title: 'Send To Trash',
        panelClass: 'dailogClass',
        description: 'Are you sure you want to send to trash?',
      },
    })
      .afterClosed().subscribe(res => {
        if (res) {
          let data = {
            labelIds: [id]
          }
          let items = {
            labelIds: this.labelIds
          }
          this.isLoading = true;
          this._apiServices.sendInTrash(id ? data : items).subscribe(res => {
            if (res?.isSuccess) {
              this._toasterService.successToast('Mail send to trash successfully')
              this.getInboxList();
              this.labelIds = [];
              this.isLoading = false;
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

  openAndScan(data: any) {
    this.dialog.open(ConfirmationComponent, {
      maxWidth: '390px',
      minWidth: '390px',
      panelClass: 'dailogClass',
      data: {
        title: 'Open and scan ',
        panelClass: 'dailogClass',
        description: 'Are you sure you want to open and scan?',
      },
    })
      .afterClosed().subscribe(res => {
        if (res) {
          let item = {
            labelIds: [data?.id]
          };
          let items = {
            labelIds: this.labelIds
          }
          this.isLoading = true;
          this._apiServices.openAndScanReq(data?.id ? item : items).subscribe(res => {

            if (res.isSuccess) {
              this._toasterService.successToast('Open and scan request sent successfully');
              this.getInboxList();
              this.labelIds = [];
              this.isLoading = false;
            } else {
              this.isLoading = false;
            }

          })
        }
      })
  }
  forwardMultiple(data: any) {
    // this.dialog.open(ConfirmationComponent, {
    //   maxWidth: '390px',
    //   minWidth: '390px',
    //   panelClass: 'dailogClass',
    //   data: {
    //     title: 'Forward ',
    //     panelClass: 'dailogClass',
    //     description: 'Are you sure you want to forward?',
    //   },
    // })
    //   .afterClosed().subscribe(res => {
    //     if (res) {
    //       let item = {
    //         labelIds: [data?.id]
    //       };
    //       let items = {
    //         labelIds: this.labelIds
    //       }

    //     }
    //   })

    this._router.navigate(["/client/forwardmailfirst"], {
      queryParams: { labelIds: this.labelIds },
    });
  }

  holdForPickUp(data: any) {
    // this._apiServices.holdForPickUp(data?.id).subscribe(res=>{
    //   if(res.isSuccess){
    this.openHoldForPicupDialog(data);
    //   }
    // })
  }

  openHoldForPicupDialog(data: any, labelIds?: any) {
    this.dialog.open(HoldpickupComponent, {
      maxWidth: '100%',
      minWidth: '450px',
      minHeight: '500px',
      data: { id: data?.id, code: data?.code, labelIds: labelIds },
    })
      .afterClosed().subscribe(res => {
        if (res) {
          this.getInboxList();
        }
        // else {

        // }
      })
  }

  viewImages(data: any) {
    const dialogRef = this.dialog.open(ClickviewComponent, {
      width: '100%',
      height: '340px',
      panelClass: 'clickview',
      position: { bottom: '0px' },
      data: { images: data }
    }).afterClosed().subscribe((e: any) => {

    })
  }
  sendToArchive(data: any) {
    this._apiServices.sendToArchive(data?.id).subscribe(res => {
      if (res?.isSuccess) {
        this.getInboxList();
      }
    })
  }

  holdForPickupMultiple() {

  }

}
