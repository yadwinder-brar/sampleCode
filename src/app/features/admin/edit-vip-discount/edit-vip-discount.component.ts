
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-edit-vip-discount',
  templateUrl: './edit-vip-discount.component.html',
  styleUrls: ['./edit-vip-discount.component.css']
})
export class EditVipDiscountComponent implements OnInit {
    userId:any
    discountValue:any
    discount = new FormControl('', [ValidatorsService.required]);
    margin = new FormControl('', [ValidatorsService.required]);
      constructor(
        public dialogRef: MatDialogRef<EditVipDiscountComponent>,
        @Inject(MAT_DIALOG_DATA) public data:any,
        private _apiService: ApiService,
        private _toasterService: ToasterService
      ) {
        this.data
       }
    
      ngOnInit(): void {
        this.discount.setValue(this.data?.userData?.userMarginAndDiscount?.defaultDiscount);
        this.margin.setValue(this.data?.userData?.userMarginAndDiscount?.defaultMargin);
      }
    
      updateUserDiscount(){
        if (this.discount?.valid && this.margin.valid) {
          let data = {
            discount: this.discount.value,
            margin:this.margin.value
          }
          this._apiService.updateVipDiscount(data,this.data?.userData?.id).subscribe(res => {
            if (res?.isSuccess) {
              this._toasterService.successToast('User margin And discount updated successfully')
              this.dialogRef.close(true);
            }else{
              
            }
          })
        } else{
          this.discount.markAsTouched();
        }
      }
  
  }
  