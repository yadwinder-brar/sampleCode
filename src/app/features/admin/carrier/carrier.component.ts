import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddnewcarrierComponent } from '../addnewcarrier/addnewcarrier.component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.css']
})
export class CarrierComponent implements OnInit {
  isLoading: boolean = false;
  carrierData: any = [];

  constructor(private dialog: MatDialog,
    private _apiServices: ApiService,
    ) { }

  ngOnInit(): void {
    this.getCarrierDetail();
  }
  Addnewcarrier (): void {
    const dialogRef = this.dialog.open(AddnewcarrierComponent, {
      width: '33%',
      height: '350px',
      panelClass: 'upload',
   });
   }
  
getCarrierDetail(){

  this.isLoading = true;
  this._apiServices.getCarrierDetail().subscribe(res=>{
    if(res?.isSuccess){
      this.carrierData = res?.data;
      this.isLoading = false;
    }else{
      this.isLoading = false;
    }
  })
}


}
