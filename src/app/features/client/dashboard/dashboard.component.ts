import { Component, OnInit, inject } from '@angular/core';
import { ApiService, AuthService,ToasterService} from 'src/app/core/services';
import { EMPTY, catchError, take } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  pageName = 'Dashboard';
  dashboardStatus: any;
  dashboardData: boolean = false;
  isloading: boolean = false;
  isBarloading: boolean = false;
  savingChartData: any = [];
  shipmentCountChartData: any = [];
  monthData: any = [];
  year: any = '2023';
  fromDate: any = '';
  toDate: any = '';
  starDate: any = '';
  endDate: any = '';
  userData: any;
  // public barChartData: any[] = [{ data: [55, 60, 75, 82, 56, 62, 80], label: 'savings on shipments' },];

  constructor(
    private _apiServices: ApiService,
    private _toasterService: ToasterService,
    private _authService: AuthService
  ) {
    this.userData = this._authService.getUserProfile();
  }

  ngOnInit(): void {
    this.getShipmentCountChartData();
    this.getShipmentSavingChartData();
    this.getDashboardStatus();

    this.scrollPage();
  }

  chosenYearHandler(ev: any, picker: any) {
    let _d = ev;
    this.year = _d.getFullYear();
    this.getShipmentSavingChartData();
    picker.close();
  }
  public doughnutChartLabels: string[] = ['Completed', 'Drafted', 'Total'];
  public doughnutChartDatasets: any = [
    {
      data: '',
      label: 'Total system usage',
      backgroundColor: ['#63E88B', '#e44531', '#fd79a8'],
      cutout: '60%',
    },
  ];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    fillOpacity: 0.3,
  };
  onSkip(){
      const data = {
        isLoginFirstTime: {
          mailBoxTour:this.userData?.isLoginFirstTime.mailBoxTour,
          shipmentTour: 'notFirst',
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
          if(res?.data?.isLoginFirstTime?.shipmentTour == 'notFirst'){
            this._authService.storeUserProfile(res?.data);
          }
          console.log(res, 'tour responce');
        });
    
  }
  public mbarChartLabels: any = [
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
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [
    {
      data: [],
      label: 'savings on shipments',
      backgroundColor: ['#63E88B'],
      fillOpacity: 0.3,
    },
  ];

  getShipmentSavingChartData() {
    let data = {
      year: this.year,
    };
    this.isBarloading = true;
    this._apiServices.getShipmentSavingGraph(data).subscribe((res) => {
      if (res?.isSuccess) {
        this.savingChartData = res?.data;
        this.barChartData[0].data = [
          res?.data?.Jan,
          res?.data?.Feb,
          res?.data?.Mar,
          res?.data?.Apr,
          res?.data?.May,
          res?.data?.Jun,
          res?.data?.Jul,
          res?.data?.Aug,
          res?.data?.Sep,
          res?.data?.Oct,
          res?.data?.Nov,
          res?.data?.dec,
        ];
        this.isBarloading = false;
      } else {
        this.isBarloading = false;
      }
    });
  }
  getShipmentCountChartData() {
    let data = {
      fromDate: this.starDate,
      toDate: this.endDate,
    };
    this.isloading = true;
    this._apiServices.getShipmentsCountGraph(data).subscribe((res) => {
      if (res?.isSuccess) {
        this.shipmentCountChartData = res?.data;
        // let items = [5,this.shipmentCountChartData?.drafted,0];
        let items = [
          this.shipmentCountChartData?.completed,
          this.shipmentCountChartData?.drafted,
          0,
        ];
        this.doughnutChartDatasets[0].data = items;
        let completed =
          this.shipmentCountChartData?.completed + ' ' + 'Completed';
        let drafted = this.shipmentCountChartData?.drafted + ' ' + 'Drafted ';
        let total = this.shipmentCountChartData?.total + ' ' + 'Total';
        this.doughnutChartLabels = [completed, drafted, total];
        this.isloading = false;
        // if (this.userData?.isLoginFirstTime == 'first') {
          // this.tourStart();
        // }
      } else {
        this.isloading = false;
      }
    });
  }
  getShipmentCountChartDataByDate() {
    if (this.endDate != '') {
      this.getShipmentCountChartData();
    }
  }
  getShipmentSavingChartDataBydate() {
    if (this.toDate != '') {
      this.getShipmentSavingChartData();
    }
  }

  getDashboardStatus() {
    this.isloading = true;
    this._apiServices.getDashboardStatus().subscribe((res) => {
      if (res?.isSuccess) {
        this.dashboardStatus = res?.data;
        this.isloading = false;
      } else {
        this.isloading = false;
      }
    });
  }


  scrollPage() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
