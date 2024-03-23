import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { catchError, EMPTY, take } from 'rxjs';
import { ToasterService } from 'src/app/core/services';
import { SubAdminAddTopUpComponent } from './subAdmin-add-topUp/subAdmin-add-topUp.component';

@Component({
  selector: 'app-sub-admin-plans',
  templateUrl: './sub-admin-plans.component.html',
  styleUrls: ['./sub-admin-plans.component.css']
})
export class SubAdminPlansComponent implements OnInit {
  isloading: boolean = false;
  PlansData: any = [];
  planType: string = 'monthly';
  constructor(
    private _apiServices: ApiService,
    private _toasterService: ToasterService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getPlans();
  }

  getPlans() {
    this.isloading = true;
    let data = this.planType
    this._apiServices.getMailBoxPlans(data).subscribe(res => {
      if (res.isSuccess) {
        this.PlansData = res?.items;
        this.isloading = false;
      } else {
        this.isloading = false;
      }
    })
  }

  deletePlan(id: any) {

    this.dialog.open(ConfirmationComponent, {
      maxWidth: '390px',
      minWidth: '390px',
      panelClass: 'dailogClass',
      data: {
        title: 'Delete plan',
        panelClass: 'DilogClass',
        description: 'Are you sure to delete this plan?',
      },
    })
      .afterClosed().subscribe(res => {
        if (res) {
          let data = {
            status: 'inactive'
          }
          this.isloading = true
          this._apiServices.deletePlan(id, data).subscribe(res => {
            if (res?.isSuccess) {
              this.getPlans()
            }
          })
        }
      })
  }
  planTypeChange(event: any) {
    this.getPlans();
  }
  addTopUp(item?:any){
    
    this.dialog.open(SubAdminAddTopUpComponent, {
      maxWidth: '600px',
      minWidth: '450px',
      panelClass: 'dailogClass',
      data: {planData:item},
    })
      .afterClosed().subscribe(res => {
        if (res) {
          this.getPlans()
        }
      })
  }
  AddToPopular(item:any){
let data={
  isPopular: !item?.isPopular
}
this.isloading=true;
this._apiServices.addRemovePopular(item?.id, data).pipe(catchError((error) => {
  error?this.isloading = false:''
  this._toasterService.errorToast(error?.message);
  return EMPTY;
}),take(1)).subscribe(res=>{
  if(res?.isSuccess){
    this.isloading=false;
    this.getPlans();
  }else{
    this.isloading=false;
  }
})
  }
}
