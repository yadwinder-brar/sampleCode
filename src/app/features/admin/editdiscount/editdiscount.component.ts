import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { EditmarginComponent } from '../editmargin/editmargin.component';

@Component({
  selector: 'app-editdiscount',
  templateUrl: './editdiscount.component.html',
  styleUrls: ['./editdiscount.component.css']
})
export class EditdiscountComponent implements OnInit {
  discountId:any
  discountValue:any
  discount = new FormControl('', [ValidatorsService.required]);
    constructor(
      public dialogRef: MatDialogRef<EditmarginComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any,
      private _apiService: ApiService,
      private _toasterService: ToasterService
    ) {
      this.discountId = this.data?.item?.id
      this.discountValue = this.data?.item?.defaultDiscount
     }
  
    ngOnInit(): void {
      this.discount.setValue(this.discountValue);
    }
  
    updateDiscount(){
      if (this.discount.valid) {
        let data = {
          defaultDiscount: this.discount.value,
          defaultMargin:this.data?.item?.defaultMargin
        }
        this._apiService.updateDiscount(data,this.discountId).subscribe(res => {
          if (res?.isSuccess) {
            this._toasterService.successToast('Discount updated successfully')
            this.dialogRef.close(true);
          }else{
            
          }
        })
      }
    }

}
