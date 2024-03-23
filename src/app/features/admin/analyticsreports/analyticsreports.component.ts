import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services';
import { Locations } from 'src/app/share/models/locations.model';
import { Logs } from 'src/app/share/models/logs.model';
import { Revenue } from 'src/app/share/models/revenue.model';

@Component({
  selector: 'app-analyticsreports',
  templateUrl: './analyticsreports.component.html',
  styleUrls: ['./analyticsreports.component.css']
})
export class AnalyticsreportsComponent implements OnInit {
  isLoading:boolean= false;
  isLogsLoading:boolean= false;
  isRevenueLoading:boolean= false;
  logs:Logs[] = [];
  locations:Locations[] = [];
  revenue:Revenue[] = [];
  totalRecords: any;
  endDate :any = new Date();
  startDate: any = new Date();
    search: string = '';
    pageNo: number = 1;
    pageSize: number = 10;
    zoom: number = 4;
    // icon = {
    //   url: '/assets/images/icon/mapicon.svg',
    //   scaledSize: {
    //     width: 30,
    //     height: 30}
    //   };
    lat: number = 37.090240;
    lng: number = -95.712891;
    scroll: boolean = false;
  constructor(
    private _apiServices:ApiService
  ) { }

  ngOnInit(): void {
    let date = new Date();
    this.startDate.setDate(date.getDate() - 1);
    this.getlogs();
    this.getLocations();
    this.getRevenue();
  }
  getlogs(){
  this.isLogsLoading=true;
  this._apiServices.getLogs().subscribe(res=>{
    if(res?.isSuccess){
      this.logs = res?.items
      this.isLogsLoading=false;
    }else{
      this.isLogsLoading=false;
    }
  })
  }
 getLocations(){
  this.isLoading=true;
  this._apiServices.getLocations().subscribe(res=>{
    if(res?.isSuccess){
      this.locations = res?.data
      this.isLoading=false;
    }else{
      this.isLoading=false;
    }
  })
 }
 getRevenue(){
  this.isRevenueLoading=true;
  let data = {
    search:this.search,
    startDate:this.startDate,
    endDate:this.endDate,
  }
  this._apiServices.getRevenue(data).subscribe(res=>{
    if(res?.isSuccess){
      this.revenue = res?.data
      this.totalRecords = res?.totalRecords
      this.isRevenueLoading=false;
    }else{
      this.isRevenueLoading=false;
    }
  })
 }
 searchBydate(event:any){
  if(this.endDate)this.getRevenue();
 }

}
