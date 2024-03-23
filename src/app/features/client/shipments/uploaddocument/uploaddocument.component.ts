import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services';

@Component({
  selector: 'app-uploaddocument',
  templateUrl: './uploaddocument.component.html',
  styleUrls: ['./uploaddocument.component.css']
})
export class UploaddocumentComponent implements OnInit {
  fileName!: string;
  url: any = ''
  isLoading: boolean = false;
  constructor(
    private _router:Router,
    private _apiService:ApiService
  ) { }

  ngOnInit(): void {
  }

  selectFile(event: any) {
    this.fileName = event[0]
    this.url = event[0];
    localStorage.setItem('postOfficeForm', this.url)
  }
  submitFile(file:any) {
    if (this.url) {
      this.isLoading = true;
      const uploadedFile = new FormData();
      uploadedFile.append( 'file', file?.files[0]);
      this._apiService.uploadBulkShipment(uploadedFile).subscribe(res=>{
        if(res?.isSuccess){
          this._router.navigate(['/client/shipments'])
          this.isLoading = false;
        }else{
          this.isLoading = false;
        }
      })
    } else {
      alert('please select file')
    }
  }


  uploadFile(files:any){
 let fileList = (<HTMLInputElement>files.target).files
 
 if (fileList && fileList.length == 0) {
   files.target.value = '';
   this.url = ''
  }
  
  if (fileList && fileList.length > 0) {
    let file: File = fileList[0];
    let reader: FileReader = new FileReader();
    this.url =  reader.readAsText(file);
    this.url = fileList
}




  }

  changeFile(event:any) {
    // this.fileName = event.target.value;
    // event.target.value = null;
  }


}
