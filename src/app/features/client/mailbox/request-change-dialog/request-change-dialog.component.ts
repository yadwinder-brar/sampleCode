
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { HoldpickupComponent } from 'src/app/features/add-shipment/holdpickup/holdpickup.component';
import { ConfirmationComponent } from 'src/app/features/confirmation/confirmation.component';
import { ClickviewComponent } from '../clickview/clickview.component';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-request-change-dialog',
  templateUrl: './request-change-dialog.component.html',
  styleUrls: ['./request-change-dialog.component.css']
})
export class RequestChangeDialogComponent implements OnInit {
  labelData:any = {};
  isLoading:boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RequestChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialog: MatDialog,
    public sanitizer: DomSanitizer,
    private _apiServices:ApiService,
    private _toasterService:ToasterService
  ) { 
this.labelData = this.dialogData?.data;
 }
  ngOnInit() {
  }
  notMyMail(id:any){
    this.dialog.open(ConfirmationComponent,{
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
          labelIds:[id]
        }
        this.isLoading = true;
        this._apiServices.notMyMail(data).subscribe(res=>{
          if(res?.isSuccess){
            this._toasterService.successToast('Mail removed successfully');
            this.dialogRef.close(true);
          }else{
            this.isLoading = false;
          }
        })
      }
    })
}

viewImg(data:any){
  window.open(data?.labelLink, "_blank")
}
getImageName(img:string):any{
  // let img = "html/data/img.pdf"
  let data = img.split(".");
  let type = data[data.length-1]
  return type;
  }
sendToTrash(id:any){
  this.dialog.open(ConfirmationComponent,{
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
        labelIds:[id]
      }
      this.isLoading = true;
      this._apiServices.sendInTrash(data).subscribe(res=>{
        if(res?.isSuccess){
          this._toasterService.successToast('Mail send to trash successfully')
          this.dialogRef.close(true);
        }else{
          this.isLoading = false;
        }
      })
    }
  })

}

openAndScan(data:any){
  this.openAndScanReq(data);
  // this.dialogData?.type =='trash'? this.openAndScanReq(data):this.openAndScanArchive(data);

}



openAndScanReq(data:any){
  this.dialog.open(ConfirmationComponent,{
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
  
    labelIds:[data?.id]
};
  this.isLoading=true;
  this._apiServices.openAndScanReq(item).subscribe(res=>{

    if(res.isSuccess){
      this._toasterService.successToast('Open and scan request sent successfully');
      this.dialogRef.close(true);
      this.isLoading=false;
    }else{
      this.isLoading=false;
    }
    
  })
}
})
}
openAndScanArchive(data:any){

}


holdForPickUp(data:any){
  if(data?.code){
    this.openHoldForPicupDialog(data);
  }else{
  // this.isLoading = true;
  // this._apiServices.holdForPickUp(data?.id).subscribe(res=>{
  //   if(res.isSuccess){
     this.openHoldForPicupDialog(data);
  //   }
  // })
}
}

openHoldForPicupDialog(data:any){
  this.dialog.open(HoldpickupComponent,{
    maxWidth: '100%',
    minWidth: '450px',
    minHeight:'500px',
    data: {id:data?.id,code:data?.code,type: this.dialogData?.type},
  })
  .afterClosed().subscribe(res => {
    if (res) {
      this.dialogRef.close(true);
    }})
}

viewImages(data:any){
  const dialogRef = this.dialog.open(ClickviewComponent, {
    width: '100%',
    height: '340px',
    panelClass: 'clickview',
    position: { bottom: '0px' },
    data:{images:data}
  }).afterClosed().subscribe((e:any)=>{

  })
}


}