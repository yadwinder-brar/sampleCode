import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services';

@Component({
  selector: 'app-sub-admin-dashboard',
  templateUrl: './sub-admin-dashboard.component.html',
  styleUrls: ['./sub-admin-dashboard.component.css']
})
export class SubAdminDashboardComponent implements OnInit {
  isLoading: boolean = false;
  isLineChartLoading: boolean = false;
  isDonughtChartLoading: boolean = false;
  dashboardStatus: any;
  savingChartData: any = [];
  shipmentCountChartData: any = [];
  year: any = '2023';
  starDate: any = '';
  endDate: any = '';
  constructor(
    private _apiServices: ApiService
  ) { }
  chosenYearHandler(ev: any, picker: any) {
    let _d = ev;
    this.year = _d.getFullYear();
    this.getDashboardshipingAndMailboxcount();
    picker.close();
  }

  lineChartData: any = [
    {
      data: [],
      label: 'Mailbox',
      backgroundColor: '#f189bb',
      fillOpacity: 0.2,
      tension: 0.5,
      showLine: true,
      borderColor: '#f189bb'
    },
  ];

  lineChartLabels: any = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  lineChartOptions = {
    responsive: true,
    fillOpacity: 0.1,
  };

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';



  public doughnutChartLabels: string[] = ['Completed', 'Drafted', 'Total'];
  public doughnutChartDatasets: any = [
    {
      data: '',
      label: 'Total system usage',
      backgroundColor: [
        '#63E88B',
        '#e44531',
        '#fd79a8'
      ],
      cutout: "60%"
    }
  ];
  ngOnInit(): void {
    this.getDashboardStatus();
    // this.getShipmentCountChartData();
    this.getDashboardshipingAndMailboxcount()
  }

  getDashboardStatus() {
    this.isLoading = true;
    this._apiServices.subAdminDashboardData().subscribe(res => {
      if (res?.isSuccess) {
        this.dashboardStatus = res?.data;
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }

    })
  }

  getDashboardshipingAndMailboxcount() {
    let data = {
      year: this.year
    }
    this.isLineChartLoading = true
    this._apiServices.getAdminAccountCount(data).subscribe(res => {
      if (res?.isSuccess) {
        this.savingChartData = res?.data
        // let shipment = [this.savingChartData?.totalShipmentAccounts?.Jan, this.savingChartData?.totalShipmentAccounts?.Feb, this.savingChartData?.totalShipmentAccounts?.Mar, this.savingChartData?.totalShipmentAccounts?.Apr, this.savingChartData?.totalShipmentAccounts?.May, this.savingChartData?.totalShipmentAccounts?.Jun, this.savingChartData?.totalShipmentAccounts?.Jul, this.savingChartData?.totalShipmentAccounts?.Aug, this.savingChartData?.totalShipmentAccounts?.Sep, this.savingChartData?.totalShipmentAccounts?.Oct, this.savingChartData?.totalShipmentAccounts?.Nov, this.savingChartData?.totalShipmentAccounts?.Dec,];
        let mailbox = [this.savingChartData?.totalVirtualMailBoxAccounts?.Jan, this.savingChartData?.totalVirtualMailBoxAccounts?.Feb, this.savingChartData?.totalVirtualMailBoxAccounts?.Mar, this.savingChartData?.totalVirtualMailBoxAccounts?.Apr, this.savingChartData?.totalVirtualMailBoxAccounts?.May, this.savingChartData?.totalVirtualMailBoxAccounts?.Jun, this.savingChartData?.totalVirtualMailBoxAccounts?.Jul, this.savingChartData?.totalVirtualMailBoxAccounts?.Aug, this.savingChartData?.totalVirtualMailBoxAccounts?.Sep, this.savingChartData?.totalVirtualMailBoxAccounts?.Oct, this.savingChartData?.totalVirtualMailBoxAccounts?.Nov, this.savingChartData?.totalVirtualMailBoxAccounts?.Dec,];
        this.lineChartData[0].data = mailbox
        // this.lineChartData[1].data = mailbox
        this.lineChartData
        this.isLineChartLoading = false;
      } else {
        this.isLineChartLoading = false;
      }
    })
    // api/dashboards/adminAccountsGraph?year=2023

  }

  getShipmentCountChartData() {
    let data = {
      fromDate: this.starDate,
      toDate: this.endDate
    }
    this.isDonughtChartLoading = true
    this._apiServices.getShipmentsCountGraph(data).subscribe(res => {
      if (res?.isSuccess) {
        this.shipmentCountChartData = res?.data;
        let items = [this.shipmentCountChartData?.completed, this.shipmentCountChartData?.cancelled, 0];
        this.doughnutChartDatasets[0].data = items;
        let completed = this.shipmentCountChartData?.completed + ' ' + 'Completed';
        let drafted = this.shipmentCountChartData?.cancelled + ' ' + 'Cancelled ';
        let total = this.shipmentCountChartData?.total + ' ' + 'Total';
        this.doughnutChartLabels = [completed, drafted, total]
        this.isDonughtChartLoading = false;
      } else {
        this.isDonughtChartLoading = false;
      }
    })
  }
  getShipmentCountChartDataByDate() {
    if (this.endDate != '') {
      this.getShipmentCountChartData();
    }
  }
}
