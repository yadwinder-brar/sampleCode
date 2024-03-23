import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-subAdmin-salesTax-edit',
  templateUrl: './subAdmin-salesTax-edit.component.html',
  styleUrls: ['./subAdmin-salesTax-edit.component.css']
})
export class SubAdminSalesTaxEditComponent implements OnInit {
marginId:any
marginValue:any
margin = new FormControl('', [ValidatorsService.required]);
  constructor(
    public dialogRef: MatDialogRef<SubAdminSalesTaxEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _apiService: ApiService,
    private _toasterService: ToasterService
  ) {
    this.marginId = this.data?.item?.id
    this.marginValue = this.data?.item?.defaultMargin
   }

  ngOnInit(): void {
    this.margin.setValue(this.marginValue);
  }

  updateDiscount(){
    if (this.margin.valid) {
      let data = {
        defaultMargin: this.margin.value,
        defaultDiscount: this.data?.item?.defaultDiscount
      }
      this._apiService.updateMargin(data,this.marginId).subscribe(res => {
        if (res?.isSuccess) {
          this._toasterService.successToast('Margin updated successfully')
          this.dialogRef.close(true);
        }else{
          
        }
      })
    }
  }


}
