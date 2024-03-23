import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignmailboxComponent } from '../../assignmailbox/assignmailbox.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, ToasterService } from 'src/app/core/services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ConfirmationComponent } from 'src/app/features/confirmation/confirmation.component';
import { PostOfficeFormDetailComponent } from '../post-office-form-detail/post-office-form-detail.component';

@Component({
  selector: 'app-mailboxrequestdetail',
  templateUrl: './mailboxrequestdetail.component.html',
  styleUrls: ['./mailboxrequestdetail.component.css']
})
export class MailboxrequestdetailComponent implements OnInit {
  isLoading: boolean = false;
  requestId: string = '';
  requestDetail: any;
  constructor(
    private dialog: MatDialog,
    private _route: ActivatedRoute,
    private _toasterServices: ToasterService,
    private _router: Router,
    private http: HttpClient,
    private _apiServices: ApiService,
  ) {
    this.requestId = this._route.snapshot.params["id"];

  }

  ngOnInit(): void {
    if (this.requestId) {
      this.isLoading = true;
      this._apiServices.getMailBoxRequestDetail(this.requestId).subscribe(res => {
        if (res.isSuccess) {
          this.requestDetail = res.data;
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      })
    }
  }
  Assignmailbox(id: any): void {
    const dialogRef = this.dialog.open(AssignmailboxComponent, {
      width: '40%',
      height: '250px',
      panelClass: 'upload',
      data: { id: id }
    }).afterClosed().subscribe(res => {
      if(res){
        this._toasterServices.successToast('Mailbox request approved succesfully')
        this._router.navigate(['/admin/mailboxrequest']);
      }
    })
  }
  dowanlodImg(imgPath: any) {
    //   let title = 'form.pdf'
    // const a = document.createElement('a');
    // a.href = URL.createObjectURL(imgPath);
    // a.download = title;
    // document.body.appendChild(a);
    // a.click();
    // window.location = imgPath;

    const a: any = document.createElement('a');
    a.href = imgPath;
    a.download = 'form';
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();

  }
  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }
  dowanloadProff(url: any) {
    // (click)="dowanloadProff(requestDetail?.proofDocument?.documents[1]?.url)"
    // let a = document.createElement('a');
    // a.href = url;
    // a.download = url;
    // a.click();
    this.download(url)
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'ProfImg';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }
  // rejectRequest(id:any){
  //   let data ={
  //     status: "rejected",
  //     virtualId: ""
  //   }
  //   this._apiServices.approveRejectMailBoxRequest(data,id).subscribe(res=>{
  //     if(res.isSuccess){
  //       this._router.navigate(['/admin/mailboxrequest']);
  //     }
  //   })
  // }
  rejectRequest(id: any) {
    let data = {
      status: "rejected",
      virtualId: ""
    }
    const dialogRef = this.dialog
      .open(ConfirmationComponent, {
        maxWidth: '390px',
        minWidth: '390px',
        panelClass: 'dailogClass',
        data: {
          title: 'Reject Mailbox Request',
          panelClass: 'dailogClass',
          description: 'Are you sure to reject mailbox request?',
        },
      })
      .afterClosed().subscribe(res => {
        if (res) {
          this._apiServices.approveRejectMailBoxRequest(data, id).subscribe(res => {
            if (res.isSuccess) {
              this._toasterServices.successToast('Mailbox Rejected successfully');
              this._router.navigate(['/admin/mailboxrequest']);
            }
          })
        }
      })
  }

  openForm(data:any){
    this.dialog.open(PostOfficeFormDetailComponent, {
      width: '90%',
      height: '600px',
      panelClass: 'dailogClass',
      data: { userData: data }
    })
  }

}
