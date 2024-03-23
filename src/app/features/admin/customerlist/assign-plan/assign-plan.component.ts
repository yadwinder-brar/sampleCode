import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-assign-plan',
  templateUrl: './assign-plan.component.html',
  styleUrls: ['./assign-plan.component.css']
})
export class AssignPlanComponent implements OnInit {
  isLoading:boolean = false;
  PlansData:any = [];
  selectedPlan:any = '';
  planType: string = 'monthly';
  constructor(
    public dialogRef: MatDialogRef<AssignPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private _apiServices: ApiService,
    private _toasterService: ToasterService,
  ) { 
  }

  ngOnInit(): void {
    this.getPlanDetail();
  }
  storePlanId(id: any) {
    this.selectedPlan = id
  }
  planTypeChange(event: any) {
    this.getPlanDetail();
  }
  getPlanDetail() {
    this.isLoading = true;
    let data = this.planType
    this._apiServices.getMailBoxPlans(data).subscribe(res => {
      if (res.isSuccess) {
        this.PlansData = res?.items;
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    })
  }

  assignPlan() {
    let data = {
      "userId": this.dialogData?.userId,
      "planId": this.selectedPlan
    }
    if (this.selectedPlan !== '') {
      this.isLoading = true;
      this._apiServices.assignMailboxPlanToUser(data).subscribe(res => {
        if (res?.isSuccess) {
          this._toasterService.successToast('Plan assigned successfully')
          this.dialogRef.close(true);
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      })
    } else {
      alert('Please select plan');
    }
  }




}
