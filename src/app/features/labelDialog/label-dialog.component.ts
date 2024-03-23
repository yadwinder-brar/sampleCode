import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiEndpoints } from 'src/app/core/config/api-endpoints.config';
import { ApiService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
  @Component({
    selector: 'app-label-dialog',
    templateUrl: './label-dialog.component.html',
    styleUrls: ['./label-dialog.component.css']
  })
  export class LabelDialogComponent implements OnInit {
    labelData:any = [];
    shipmentId:any;
    isloading:boolean=false;
    url: any = environment.apiUrls.baseApiUrl;
    constructor(
      public dialogRef:MatDialogRef<LabelDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _apiServices:ApiService
    ) { }
    ngOnInit() {

      this.labelData = this.data?.data
      this.shipmentId = this.data?.shipmentId
    }
    printLabel(data:any){
      window.open( data , "_blank")
    }
    printLabelAll(){
      this.isloading=true;
      // this._apiServices.printMultipleLabel(this.shipmentId).pipe(
      //   catchError((error) => {
      //     error ? this.isloading = false : ''
      //     return EMPTY;
      //   }), take(1)).subscribe(res => {
      //   if(res?.isSuccess){
      // 
      //     this.isloading = false;
      //     window.open(res?.data)
      //     this.dialogRef.close();
      //   }
      //   })
        this.isloading=false;

    let data1 = this.url + ApiEndpoints.Shipments.PrintMultipleLabel + '/' +this.shipmentId

    window.open(data1);
    

    }
  }
