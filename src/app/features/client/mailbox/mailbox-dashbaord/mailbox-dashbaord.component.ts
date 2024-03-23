import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import {
  GuidedTour,
  Orientation,
  GuidedTourService,
  ProgressIndicatorLocation,
} from 'ngx-guided-tour';
import { EMPTY, catchError, take } from 'rxjs';
import { StepTourService } from 'src/app/core/services/tour.service';
import { AuthService, ToasterService } from 'src/app/core/services';

@Component({
  selector: 'app-Mailbox-dashbaord',
  templateUrl: './mailbox-dashbaord.component.html',
  styleUrls: ['./mailbox-dashbaord.component.css'],
})
export class MailboxDashbaordComponent implements OnInit {
  isloading: boolean = false;
  starDate: any = '';
  endDate: any = '';
  year: any = '2023';
  shipmentCountChartData: any = [];
  isLineloading: boolean = false;
  savingChartData: any = [];
  donughtChardData: any;
  userData: any;
  constructor(
    private _apiServices: ApiService,
    private _toasterService: ToasterService,
    private _authService: AuthService
  ) {
    this.userData = this._authService.getUserProfile();

  }

  ngOnInit(): void {
    this.getMailboxCountChartData();
    this.getMailboxlineChartData();
    this.scrollPage();
  }

  scrollPage() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  chosenYearHandler(ev: any, picker: any) {
    let _d = ev;
    this.year = _d.getFullYear();
    this.getMailboxlineChartData();
    picker.close();
  }
onSkip(){
  const data = {
    isLoginFirstTime: {
      shipmentTour:this.userData?.isLoginFirstTime?.shipmentTour,
      mailBoxTour: 'notFirst',
    },
  };
  let id = this._authService.getUserId();
  this._apiServices
    .updateUserTour(id, data)
    .pipe(
      catchError((error: any) => {
        this._toasterService.errorToast(error?.message);
        return EMPTY;
      }),
      take(1)
    )
    .subscribe((res) => {
      if(res?.data?.isLoginFirstTime?.mailBoxTour == 'notFirst'){
        this._authService.storeUserProfile(res?.data);
      }
    });
}
  

  lineChartData: any = [
    {
      data: [],
      label: 'Inbox',
      backgroundColor: ['#ffd1d2'],
      fill: false,
      fillOpacity: 1,
      tension: 0.5,
      borderColor: '#ffd1d2',
      borderCapStyle: 'square',
      showLine: true,
    },
    {
      data: [],
      label: 'Archive',
      backgroundColor: '#f189bb',
      fillOpacity: 0.2,
      tension: 0.5,
      showLine: true,
      borderColor: '#f189bb',
    },
  ];

  lineChartLabels: any = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  lineChartOptions = {
    responsive: true,
    fillOpacity: 0.1,
  };

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  public doughnutChartLabels: string[] = ['Inbox', 'Archive', 'Trashed'];
  public doughnutChartDatasets: any = [
    {
      data: '',
      label: 'Total system usage',
      backgroundColor: ['#F8A23A', '#63E88B', '#fd79a8'],
      cutout: '80%',
    },
  ];

  getMailboxCountChartData() {
    let data = {
      fromDate: this.starDate,
      toDate: this.endDate,
    };
    this.isloading = true;
    this._apiServices.getMailboxCountData(data).subscribe((res) => {
      if (res?.isSuccess) {
        this.shipmentCountChartData = res?.data;
        let items = [
          this.shipmentCountChartData?.inbox,
          this.shipmentCountChartData?.archived,
          this.shipmentCountChartData?.inTrash,
          0,
        ];
        this.doughnutChartDatasets[0].data = items;
        let completed = this.shipmentCountChartData?.inbox + ' ' + 'Inbox';
        let drafted = this.shipmentCountChartData?.archived + ' ' + 'Archive ';
        let total = this.shipmentCountChartData?.inTrash + ' ' + 'In Trash';
        this.doughnutChartLabels = [completed, drafted, total];
        // if (this.userData?.isLoginFirstTime == 'first') {
      
        // }
        this.isloading = false;
      } else {
        this.isloading = false;
      }
    });
  }

  getMailboxlineChartData() {
    let data = {
      year: this.year,
    };
    this.isLineloading = true;
    this._apiServices.getMailboxGraphData(data).subscribe((res) => {
      if (res?.isSuccess) {
        this.savingChartData = res?.data;
        let index = [
          this.savingChartData?.inbox?.Jan,
          this.savingChartData?.inbox?.Feb,
          this.savingChartData?.inbox?.Mar,
          this.savingChartData?.inbox?.Apr,
          this.savingChartData?.inbox?.May,
          this.savingChartData?.inbox?.Jun,
          this.savingChartData?.inbox?.Jul,
          this.savingChartData?.inbox?.Aug,
          this.savingChartData?.inbox?.Sep,
          this.savingChartData?.inbox?.Oct,
          this.savingChartData?.inbox?.Nov,
          this.savingChartData?.inbox?.Dec,
        ];
        let archive = [
          this.savingChartData?.archived?.Jan,
          this.savingChartData?.archived?.Feb,
          this.savingChartData?.archived?.Mar,
          this.savingChartData?.archived?.Apr,
          this.savingChartData?.archived?.May,
          this.savingChartData?.archived?.Jun,
          this.savingChartData?.archived?.Jul,
          this.savingChartData?.archived?.Aug,
          this.savingChartData?.archived?.Sep,
          this.savingChartData?.archived?.Oct,
          this.savingChartData?.archived?.Nov,
          this.savingChartData?.archived?.Dec,
        ];
        this.lineChartData[0].data = index;
        this.lineChartData[1].data = archive;
        this.lineChartData;
        this.isLineloading = false;
      } else {
        this.isLineloading = false;
      }
    });
  }

  getMailboxCountDataByDate() {
    if (this.endDate != '') {
      this.getMailboxCountChartData();
    }
  }

  
}
