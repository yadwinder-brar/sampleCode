import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService, AuthService } from 'src/app/core/services';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  userId: any;
  isloading: boolean = false;
  searchByPackageType:string = '';
  sortBy:string = 'createdAt,DSC'
  packagesList: any = [];
  totalRecords: any
  search: string = '';
  pageNo: number = 1;
  pageSize: number = 10;
  packagesTypelist = [
    {
      "package_type": "YOUR_PACKAGING",
      "package_name": "Your Packaging",
      "enumeration": "Customer Packaging, FedEx Express® Services",
      "max_weight_kg": 68,
      "max_weight_lbs": 150

    },
    // {
    //   "package_type": "YOUR_PACKAGING",
    //   "package_name": "YOUR_PACKAGING",
    //   "enumeration": "Customer Packaging, FedEx Ground® Economy (Formerly known as FedEx SmartPost®) Services",
    //   "max_weight_kg": 32,
    //   "max_weight_lbs": 70
    // },
    {
      "package_type": "FEDEX_ENVELOPE",
      "package_name": " FedEx Envelope",
      "enumeration": "FedEx® Letters",
      "max_weight_kg": 0.5,
      "max_weight_lbs": 1
    },
    // {
    //   "package_type": "FEDEX_BOX",
    //   "package_name": "FEDEX_BOX (max_weight 9 kg/20 lbs)",
    //   "enumeration": "FedEx® Box",
    //   "max_weight_kg": 9,
    //   "max_weight_lbs": 20
    // },
    {
      "package_type": "FEDEX_SMALL_BOX",
      "package_name": "FedEx Small Box ",
      "enumeration": "FedEx® Small Box",
      "max_weight_kg": 9,
      "max_weight_lbs": 20
    },
    {
      "package_type": "FEDEX_MEDIUM_BOX",
      "package_name": "FedEx Medium Box",
      "enumeration": "FedEx® Medium Box",
      "max_weight_kg": 9,
      "max_weight_lbs": 20
    },
    {
      "package_type": "FEDEX_LARGE_BOX",
      "package_name": "FedEx Large Box",
      "enumeration": "FedEx® Large Box",
      "max_weight_kg": 9,
      "max_weight_lbs": 20
    },
    {
      "package_type": "FEDEX_EXTRA_LARGE_BOX",
      "package_name": "FedEx Extra Large Box",
      "enumeration": "FedEx® Extra Large Box",
      "max_weight_kg": 9,
      "max_weight_lbs": 20
    },
    // {
    //   "package_type": "FEDEX_10KG_BOX",
    //   "package_name": "FEDEX_10KG_BOX ( max_weight 10 kg/22 lbs)",
    //   "enumeration": "FedEx® 10kg Box",
    //   "max_weight_kg": 10,
    //   "max_weight_lbs": 22
    // },
    // {
    //   "package_type": "FEDEX_25KG_BOX",
    //   "package_name": "FEDEX_25KG_BOX ( max_weight 25 kg/55 lbs)",
    //   "enumeration": "FedEx® 25kg Box",
    //   "max_weight_kg": 25,
    //   "max_weight_lbs": 55
    // },
    {
      "package_type": "FEDEX_PAK",
      "package_name": "FedEx Pak",
      "enumeration": "FedEx® Pak",
      "max_weight_kg": 9,
      "max_weight_lbs": 20
    },
    {
      "package_type": "FEDEX_TUBE",
      "package_name": "FedEx Tube",
      "enumeration": "FedEx® Tube",
      "max_weight_kg": 9,
      "max_weight_lbs": 20
    }
  ]
  constructor(
    private dialog: MatDialog,
    private _apiServices: ApiService,
    private _authServices: AuthService,

  ) {

    this.userId = this._authServices.getUserId();
  }

  ngOnInit(): void {

    this.getPackageList()
  }

  searchPackages(e: any) {
    setTimeout(() => {
      this.pageNo = 1;
      this.getPackageList();
    }, 1000);
  }

  getPackageList() {
    let data = {
      userId: this.userId,
      search: this.search,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      sort: this.sortBy,
      packageType: this.searchByPackageType
    }

    this.isloading = true;
    this._apiServices.getPackageList(data).subscribe(res => {
      if (res.isSuccess) {
        this.packagesList = res?.items;
        this.totalRecords = res?.totalRecords
        this.isloading = false;
      } else {
        this.isloading = false;
      }

    })
  }

  deletePackage(id: string) {
    this.dialog
    .open(ConfirmationComponent, {
      maxWidth: '390px',
      minWidth: '390px',
      panelClass: 'dailogClass',
      data: {
        title: 'Delete Pacakge',
        panelClass: 'dailogClass',
        description: 'Are you sure you want to delete pacakge?',
      },
    })
    .afterClosed().subscribe(res=>{
      if(res){
        this.isloading = true;
        this._apiServices.deletePackage(id).subscribe(res => {
          if (res?.isSuccess) {
            this.getPackageList();
            this.isloading = false;
          }else{
            this.isloading = false;
          }
        })
      }
    })

  }
  sortPackages(){
    if(this.sortBy == 'createdAt,DSC'){
      this.sortBy = 'createdAt,ASC';
      this.pageNo = 1
      this.getPackageList();
    }else{
      this.sortBy = 'createdAt,DSC';
      this.pageNo = 1
      this.getPackageList();
    }
  }
}
