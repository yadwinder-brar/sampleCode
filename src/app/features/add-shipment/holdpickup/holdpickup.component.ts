import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-holdpickup',
  templateUrl: './holdpickup.component.html',
  styleUrls: ['./holdpickup.component.css']
})
export class HoldpickupComponent implements OnInit {
  code:any;
  id:any;
  isLoading:boolean = false;
  constructor(public dialogRef:MatDialogRef<HoldpickupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _apiServices:ApiService,
    private _toasterService:ToasterService,

    ) { 
      this.id = this.data?.id;
      // this.code = this.data?.code || ''
    }

  ngOnInit(): void {
  }
  getCode(){
    this.isLoading = true
    if(this.id){
      this._apiServices.holdForPickUpOtp(this.id).subscribe(res=>{
        if(res.isSuccess){
          this.code = res?.data;
          this._toasterService.successToast('Hold for pickup code generated successfully ');
          this.isLoading = false;
        }else{
          this.isLoading = false;
        }
      })
    }else{
      let data = {
        labelIds:this.data?.labelIds,
        type: "create"
      }
      this._apiServices.holdForPickUpMultipleOtp(data).subscribe(res=>{
        if(res.isSuccess){
          this.code = res?.data;
          this._toasterService.successToast('Hold for pickup code generated successfully ')
          this.isLoading = false;
        }else{
          this.isLoading = false;
        }
      })
    }
  }
}
