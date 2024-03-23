import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-subAdmin-add-topUp',
  templateUrl: './subAdmin-add-topUp.component.html',
  styleUrls: ['./subAdmin-add-topUp.component.css']
})
export class SubAdminAddTopUpComponent implements OnInit {
  userId: any
  isLoading:boolean = false;
  price = new FormControl('', [ValidatorsService.required]);
  name = new FormControl('', [ValidatorsService.required]);
  scanCount = new FormControl('', [ValidatorsService.required]);
  constructor(
    public dialogRef: MatDialogRef<SubAdminAddTopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _apiService: ApiService,
    private _toasterService: ToasterService
  ) {
    this.data?.planData
  }

  ngOnInit(): void {
    this.price.setValue(this.data?.planData?.planPrice);
    this.name.setValue(this.data?.planData?.planName);
    this.scanCount.setValue(this.data?.planData?.scanCount);
  }

  updateTopUP() {
    if (this.price?.valid && this.scanCount.valid && this.name.valid) {
      this.isLoading = true;
      let data = {
        planName: this.name.value,
        planPrice: this.price.value,
        scanCount:this.scanCount.value,
        validity:'topUp'
       
      }
      if(this.data?.planData?.id){
        this._apiService.updateMailboxPlans(data,this.data?.planData?.id).subscribe(res => {
        if (res?.isSuccess) {
          this._toasterService.successToast('Top up updated successfully')
          this.isLoading = false;
          this.dialogRef.close(true);
        } else {
          this.isLoading = false;
        }
      })}else{
      this._apiService.addMailboxPlans(data).subscribe(res => {
        if (res?.isSuccess) {
          this._toasterService.successToast('Top up added successfully');
          this.isLoading = false;
          this.dialogRef.close(true);
        } else {
          this.isLoading = false;
        }
      })}
    } else {
      this.scanCount.markAsTouched();
      this.price.markAsTouched();
      this.name.markAsTouched();
    }
  }

}

