import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService, ToasterService } from 'src/app/core/services';

@Component({
  selector: 'app-upload-scan-imgaes',
  templateUrl: './upload-scan-imgaes.component.html',
  styleUrls: ['./upload-scan-imgaes.component.css']
})
export class UploadScanImgaesComponent implements OnInit {
  selectedImages:any=[];
  firstImg:string = '';
  secondImg:string = '';
  thirdImg:string = '';
  fourthImg:string = '';
  profileId:any;
  labelId:any;
  isLoading:boolean = false;
    constructor( 
      public dialogRef: MatDialogRef<UploadScanImgaesComponent>,
      @Inject(MAT_DIALOG_DATA) public dialogData:any,
      private _apiService:ApiService,
      private _toasterService:ToasterService,

      ) {
        this.profileId = this.dialogData?.profileId
        this.labelId = this.dialogData?.uniqueId
    }
  
    ngOnInit(): void {
    }
    selectfirstImg(e:any){
      // this.selectedImages.insert(0, e[0]);
      // this.selectedImages.splice(0,0, e[0]);
      this.firstImg = e[0];
    }
    selectSecondImg(e:any){
      this.secondImg = e[0]
      // this.selectedImages.splice(1,0, e[0]);
    }
    selectThirdImg(e:any){
      this.thirdImg = e[0];
      // this.selectedImages.push(e[0]);
    //  this.selectedImages.splice(2,0, e[0]);
    }
    selectFourthImg(e:any){
      this.fourthImg = e[0];
      // this.selectedImages.push(e[0]);
      // this.selectedImages.splice(3,0, e[0]);
    }
  
  submit(){
    this.selectedImages = [this.firstImg,this.secondImg,this.thirdImg,this.fourthImg]
if(this.firstImg||this.secondImg||this.thirdImg||this.fourthImg){

  let data  = {
    profileId:this.profileId,
    scanImages: this.selectedImages
  }
  this.isLoading = true;
  this._apiService.assignOpenAndScanRes(data,this.labelId).subscribe(res=>{
    if(res.isSuccess){
      this._toasterService.successToast('scan images send to user')
      this.dialogRef.close(true);
      this.isLoading = false;
    }else{
      this.isLoading = false;
    }
  })
}else{
alert('please upload atleast one scan')
}
  }
  
  getImageName(img:string):any{
    // let img = "html/data/img.pdf"
    let data = img.split(".");
    let type = data[data.length-1]
    return type;
    } 
  
    openAndview(img:any){
      window.open(img,'_blank')
    }
  
  
  
  
  }