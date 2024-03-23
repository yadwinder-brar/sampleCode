import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/core/services/api.service';
import { ToasterService } from 'src/app/core/services';
import { catchError, EMPTY, take } from 'rxjs';

@Component({
  selector: 'app-forwardmailfirst',
  templateUrl: './forwardmailfirst.component.html',
  styleUrls: ['./forwardmailfirst.component.css']
})
export class ForwardmailfirstComponent implements OnInit {
  labelId:string= ''
  labelIds:string[]= [];

  addressType:string='existing'
  isLoading:boolean=false
  constructor(
    private router:Router,
    private location:Location,
    private _route:ActivatedRoute,
    private _toasterService:ToasterService,
    private _apiService: ApiService,
    ) { 
    this.labelId =  this._route.snapshot.params["id"]
    this.labelIds = this._route.snapshot.queryParams['labelIds']
    let data =  localStorage.getItem('addressType')
     if(data){
      this.addressType = data;
     }
  }

  ngOnInit(): void {
  }
goto(){
  localStorage.setItem('addressType',this.addressType)
  if(this.addressType=='newAddress'){
this.labelId?this.router.navigate(['/client/forwardmail/'+ this.labelId]):this.router.navigate(["/client/forwardmail"], {
  queryParams: { labelIds: this.labelIds },
  });

// if(this.labelId){
//   this.router.navigate(['/client/forwardmail/'+ this.labelId])
// }else{
//   this.router.navigate(["/client/forwardmail"], {
//       queryParams: { labelIds: this.labelIds },
//       });
// }




  }else{
    let data:any={
      addressType:this.addressType
    }

    // this.labelIds.length? data.labelIds = this.labelIds:''

    if(this.labelId){
      this.isLoading= true
    this._apiService.forwardMail(this.labelId, data).pipe(
      catchError((error) => {
        error ? this.isLoading = false : ''
        this._toasterService.errorToast(error?.message);
        return EMPTY;
      }), take(1)).subscribe((res: any) => {
      if (res.isSuccess) {
          this.router.navigate(['/client/forwarmailsubmit'])
       this.isLoading= false
      }else{
        this.isLoading= false
      }
    })

  }else{
    data.labelIds = this.labelIds
    data.type= "create",
    this.isLoading= true
    this._apiService.forwardMultipleMail(data).pipe(
      catchError((error) => {
        error ? this.isLoading = false : ''
        this._toasterService.errorToast(error?.message);
        return EMPTY;
      }), take(1)).subscribe((res: any) => {
      if (res.isSuccess) {
          this.router.navigate(['/client/forwarmailsubmit'])
       this.isLoading= false
      }else{
        this.isLoading= false
      }
    })
  }
}
}

goBack(){
  localStorage.removeItem('addressType');
  this.location.back();
}
}
