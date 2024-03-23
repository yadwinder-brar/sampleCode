import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User_Role } from 'src/app/share/enums/userRoles';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-packege-info',
  templateUrl: './packege-info.component.html',
  styleUrls: ['./packege-info.component.css'],
})
export class PackegeInfoComponent implements OnInit {
  count: number = 1;
  next: string = '/client/add-shipment/arrival-pref';
  back: string = '';
  apiPath: string = 'packages/importPackages/';
  filteredOptions!: Observable<any[]>;
  options: any = [];
  userId: any;
  defaultPackages: any = [];
  PackegeInfoForm!: FormGroup;
  isloading: boolean = false;
  packageslist = [
    {
      package_type: 'YOUR_PACKAGING',
      carrierType: 'fedEx',
      package_name: 'Your Packaging',
      enumeration: 'Customer Packaging, FedEx Express® Services',
      max_weight_kg: 68,
      max_weight_lbs: 150,
    },
    {
      package_type: 'FEDEX_ENVELOPE',
      carrierType: 'fedEx',
      package_name: 'FedEx Envelope',
      enumeration: 'FedEx® Letters',
      max_weight_kg: 0.5,
      max_weight_lbs: 1,
    },
    {
      package_type: 'FEDEX_SMALL_BOX',
      carrierType: 'fedEx',
      package_name: 'FedEx Small Box',
      enumeration: 'FedEx® Small Box',
      max_weight_kg: 9,
      max_weight_lbs: 20,
    },
    {
      package_type: 'FEDEX_MEDIUM_BOX',
      carrierType: 'fedEx',
      package_name: 'FedEx Medium Box',
      enumeration: 'FedEx® Medium Box',
      max_weight_kg: 9,
      max_weight_lbs: 20,
    },
    {
      package_type: 'FEDEX_LARGE_BOX',
      carrierType: 'fedEx',
      package_name: 'FedEx Large Box',
      enumeration: 'FedEx® Large Box',
      max_weight_kg: 9,
      max_weight_lbs: 20,
    },
    {
      package_type: 'FEDEX_EXTRA_LARGE_BOX',
      carrierType: 'fedEx',
      package_name: 'FedEx Extra Large Box',
      enumeration: 'FedEx® Extra Large Box',
      max_weight_kg: 9,
      max_weight_lbs: 20,
    },
    {
      package_type: 'FEDEX_PAK',
      carrierType: 'fedEx',
      package_name: 'FedEx Pak',
      enumeration: 'FedEx® Pak',
      max_weight_kg: 9,
      max_weight_lbs: 20,
    },
    {
      package_type: 'FEDEX_TUBE',
      carrierType: 'fedEx',
      package_name: 'FedEx Tube',
      enumeration: 'FedEx® Tube',
      max_weight_kg: 9,
      max_weight_lbs: 20,
    },
    // {
    //   package_type: '00',
    //   carrierType: 'ups',
    //   package_name: 'Ups unknown',
    //   enumeration: 'UNKNOWN',
    //   max_weight_kg: 9,
    //   max_weight_lbs: 20,
    // },
    {
      package_type: '01',
      carrierType: 'ups',
      package_name: 'UPS Letter',
      enumeration: 'UPS Letter',
      max_weight_kg: 9,
      max_weight_lbs: 20,
    },
    // {
    //   package_type: '02',
    //   carrierType: 'ups',
    //   package_name: 'Package',
    //   enumeration: 'Package',
    //   max_weight_kg: 9,
    //   max_weight_lbs: 20,
    // },
    {
      package_type: '03',
      carrierType: 'ups',
      package_name: 'Tube',
      enumeration: 'Tube',
      max_weight_kg: 9,
      max_weight_lbs: 20,
    },
    {
      package_type: '04',
      carrierType: 'ups',
      package_name: 'Pak',
      enumeration: 'Pak',
      max_weight_kg: 9,
      max_weight_lbs: 20,
    },
    // {
    //   package_type: '21',
    //   carrierType: 'ups',
    //   package_name: 'Express Box',
    //   enumeration: 'Express Box',
    //   max_weight_kg: 9,
    //   max_weight_lbs: 20,
    // },
    // {
    //   package_type: '24',
    //   carrierType: 'ups',
    //   package_name: '25KG Box',
    //   enumeration: '25KG Box',
    //   max_weight_kg: 9,
    //   max_weight_lbs: 20,
    // },
    // {
    //   package_type: '25',
    //   carrierType: 'ups',
    //   package_name: '10KG Box',
    //   enumeration: '10KG Box',
    //   max_weight_kg: 9,
    //   max_weight_lbs: 20,
    // },
    // {
    //   package_type: '30',
    //   carrierType: 'ups',
    //   package_name: 'Pallet',
    //   enumeration: 'Pallet',
    //   max_weight_kg: 9,
    //   max_weight_lbs: 20,
    // },
    {
      package_type: '2a',
      carrierType: 'ups',
      package_name: 'Small Express Box',
      enumeration: 'Small Express Box',
      max_weight_kg: 9,
      max_weight_lbs: 20,
    },
    {
      package_type: '2b',
      carrierType: 'ups',
      package_name: 'Medium Express Box',
      enumeration: 'Medium Express Box',
      max_weight_kg: 9,
      max_weight_lbs: 20,
    },
    {
      package_type: '2c',
      carrierType: 'ups',
      package_name: 'Large Express Box',
      enumeration: 'Large Express Box',
      max_weight_kg: 9,
      max_weight_lbs: 20,
    },
  ];

  packageDimensions = [
    {
      PackageType: 'FEDEX_ENVELOPE',
      inch: { length: '0', height: '', width: '0' },
      cm: { length: '0', height: '', width: '0' },
    },
    {
      PackageType: 'FEDEX_SMALL_BOX',
      inch: { length: '8.75', height: '2.69', width: '11.45' },
      cm: { length: '22.23 ', height: '6.83 ', width: '28.73' },
    },
    {
      PackageType: 'FEDEX_MEDIUM_BOX',
      inch: { length: '8.75', height: '4.38', width: '11.45' },
      cm: { length: '22.23 ', height: '11.11 ', width: '28.73' },
    },
    {
      PackageType: 'FEDEX_LARGE_BOX',
      inch: { length: '9.5', height: '7.75', width: '15.5' },
      cm: { length: '22.23 ', height: '19.69', width: '28.73' },
    },
    {
      PackageType: 'FEDEX_EXTRA_LARGE_BOX',
      inch: { length: '11.88', height: '10.81', width: '11.06' },
      cm: { length: '30.16', height: '27.46', width: '28.10' },
    },
    {
      PackageType: 'FEDEX_PAK',
      inch: { length: '0', height: '', width: '0' },
      cm: { length: '0', height: '', width: '0' },
    },
    {
      PackageType: 'FEDEX_TUBE',
      inch: { length: '6', height: '6', width: '38' },
      cm: { length: '15.24', height: '15.24', width: '96.52 ' },
    },
    {
      PackageType: '01',
      inch: { length: '0', height: '', width: '0' },
      cm: { length: '0', height: '', width: '0' },
    },
    {
      PackageType: '02',
      inch: { length: '6', height: '6', width: '38' },
      cm: { length: '15.24', height: '15.24', width: '96.52 ' },
    },
    {
      PackageType: '03',
      inch: { length: '6', height: '6', width: '38' },
      cm: { length: '15.24', height: '15.24', width: '96.52 ' },
    },
    {
      PackageType: '04',
      inch: { length: '0', height: '', width: '0' },
      cm: { length: '0', height: '', width: '0' },
    },
    {
      PackageType: '2a',
      inch: { length: '8.75', height: '2.69', width: '11.45' },
      cm: { length: '22.23 ', height: '6.83 ', width: '28.73' },
    },
    {
      PackageType: '2b',
      inch: { length: '8.75', height: '4.38', width: '11.45' },
      cm: { length: '22.23 ', height: '11.11 ', width: '28.73' },
    },
    {
      PackageType: '2c',
      inch: { length: '9.5', height: '7.75', width: '15.5' },
      cm: { length: '22.23 ', height: '19.69', width: '28.73' },
    },
    {
      PackageType: '21',
      inch: { length: '6', height: '6', width: '38' },
      cm: { length: '15.24', height: '15.24', width: '96.52 ' },
    },
    {
      PackageType: '24',
      inch: { length: '6', height: '6', width: '38' },
      cm: { length: '15.24', height: '15.24', width: '96.52 ' },
    },
    {
      PackageType: '25',
      inch: { length: '6', height: '6', width: '38' },
      cm: { length: '15.24', height: '15.24', width: '96.52 ' },
    },
    {
      PackageType: '30',
      inch: { length: '6', height: '6', width: '38' },
      cm: { length: '15.24', height: '15.24', width: '96.52 ' },
    },
  ];
  shipmentId: any;
  userRole: any;

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _router: Router,
    private authService: AuthService,
    private _toasterServices: ToasterService,
    private location: Location
  ) {
    this.userId = localStorage.getItem('id');
    this.shipmentId = localStorage.getItem('shipmentId');
    if (!this.shipmentId) {
      this.location.back();
    }
    this.apiPath += this.shipmentId;
    let userData = this.authService.getUserProfile();
    this.userRole = userData?.role;
    if (this.userRole?.code === User_Role.ADMIN) {
      this.next = '/admin/add-shipment/arrival-pref';
      this.back = '/admin/add-shipment/res';
    } else if (this.userRole?.code === User_Role.USER) {
      this.next = '/client/add-shipment/arrival-pref';
      this.back = '/client/add-shipment/res';
    }
  }

  ngOnInit(): void {
    this.createForm();
    if (this.shipmentId) {
      this.isloading = true;
      this._apiService.getShipmentDetail(this.shipmentId).subscribe((data) => {
        if (data.isSuccess) {
          this.setPackegeData(data?.data?.packages);
          this.isloading = false;
        } else {
          this.isloading = false;
        }
      });
    } else {
      // this.location.back();
      this.isloading = false;
    }
    // this.setPackegeData(Packagedata);
    this.getAllPackages();
  }
  getAllPackages() {
    this._apiService.getPackagesById(this.userId).subscribe((res) => {
      if (res.isSuccess) {
        // this.options = res?.items;
        this.defaultPackages = res?.items;

        //     this.defaultPackages =this.defaultPackages.map((e:any)=>{
        // return {name : e.packageName!==''? e.packageName : 'data1'}
        //         })

        this.options = this.defaultPackages;
      }
    });
  }

  private _filter(value: any) {
    return this.defaultPackages.filter((option: any) =>
      option?.packageName.toLowerCase().includes(value?.toLowerCase())
    );

    // return this.options.filter((s:any) => new RegExp(value, 'gi').test(s.name));
  }

  onSelectionChange(event: any, item: any) {
    let data = event.option.value;
    let itemControl: any = item;
    item.patchValue(data);
    if (itemControl?.controls['packageType'].value !== 'YOUR_PACKAGING') {
      item?.controls['dimension']?.controls?.height?.disable();
      item?.controls['dimension']?.controls?.length?.disable();
      item?.controls['dimension']?.controls?.width?.disable();
    } else {
      item?.controls['dimension']?.controls?.height?.enable();
      item?.controls['dimension']?.controls?.length?.enable();
      item?.controls['dimension']?.controls?.width?.enable();
    }
  }
  ngAfterViewInit(): void {
    // this.filteredOptions =this.packages.controls[0]['name']?
    let data: any = this.packages.controls[0];

    this.filteredOptions = data?.controls['packageName'].valueChanges.pipe(
      startWith(''),
      map((value: any) =>
        typeof value === 'string' ? value : value?.packageName
      ),
      map((packageName) =>
        packageName ? this._filter(packageName) : this.options.slice()
      )
    );

    console.log(data);
  }
  getDefaultAddress() {
    let data = {
      addressType: '',
      user: this.userId,
    };

    this._apiService.getDefaultAddresses(data).subscribe((res) => {
      if (res.isSuccess) {
        this.options = res?.items;
        this.defaultPackages = res?.items;
      }
    });
  }

  createForm() {
    this.PackegeInfoForm = this._fb.group({
      packages: this._fb.array([
        this._fb.group({
          packageName: ['', ValidatorsService.required],
          packageType: ['', ValidatorsService.selectRequired],
          weightUnits: ['LB', ValidatorsService.selectRequired],
          weight: ['', ValidatorsService.required],
          dimension: this._fb.group({
            unit: ['IN', ValidatorsService.selectRequired],
            length: ['', ValidatorsService.required],
            width: ['', ValidatorsService.required],
            height: [''],
          }),
          insuranceDeclared: [''],
          contentDescription: [''],
          numberOfPackages: [1],
        }),
      ]),
    });
  }
  goBack() {
    this._router.navigate([this.back]);
  }

  get packages(): FormArray {
    return this.PackegeInfoForm.get('packages') as FormArray;
  }
  newPackage(): FormGroup {
    let data = this.PackegeInfoForm?.getRawValue();
    return this._fb.group({
      packageName: ['', ValidatorsService.required],
      packageType: [
        data?.packages[0]?.packageType,
        ValidatorsService.selectRequired,
      ],
      weightUnits: [
        data?.packages[0]?.weightUnits,
        ValidatorsService.selectRequired,
      ],
      weight: ['', ValidatorsService.required],
      dimension: this._fb.group({
        unit: [
          data?.packages[0]?.dimension?.unit,
          ValidatorsService.selectRequired,
        ],
        length: [
          {
            value: data?.packages[0]?.dimension?.length,
            disabled: data?.packages[0]?.packageType !== 'YOUR_PACKAGING',
          },
          ValidatorsService.required,
        ],
        width: [
          {
            value: data?.packages[0]?.dimension?.width,
            disabled: data?.packages[0]?.packageType !== 'YOUR_PACKAGING',
          },
          ValidatorsService.required,
        ],
        height: [
          {
            value: data?.packages[0]?.dimension?.height,
            disabled: data?.packages[0]?.packageType !== 'YOUR_PACKAGING',
          },
        ],
      }),
      insuranceDeclared: [''],
      contentDescription: [''],
      numberOfPackages: [1],
    });
  }

  addPackage() {
    if (this.PackegeInfoForm.valid) {
      this.packages.push(this.newPackage());
    } else {
      this._toasterServices.warningToast('please add package details first');
    }
  }
  removePackage(i: number) {
    this.packages.removeAt(i);
  }

  decreseCount(item: any, i: any) {
    let value = +item.controls['numberOfPackages'].value;
    if (value > 1) {
      let data = value - 1;
      item.controls['numberOfPackages'].setValue(data);
    }
  }
  increaseCount(item: any, i: number) {
    let value = +item.controls['numberOfPackages'].value;
    let data = value + 1;
    item.controls['numberOfPackages'].setValue(data);
  }

  setPackegeData(result: any) {
    if (result && result.length > 0) {
      this.packages.clear();
      result.forEach((x: any) => {
        this.packages.push(
          this._fb.group({
            packageName: [x.packageName, ValidatorsService.required],
            packageType: [x.packageType, ValidatorsService.selectRequired],
            weightUnits: [x.weightUnits, ValidatorsService.selectRequired],
            weight: [x.weight, ValidatorsService.required],
            dimension: this._fb.group({
              unit: [x.dimension.unit, ValidatorsService.selectRequired],
              length: [
                {
                  value: x.dimension.length,
                  disabled: x.packageType !== 'YOUR_PACKAGING',
                },
                ValidatorsService.required,
              ],
              width: [
                {
                  value: x.dimension.width,
                  disabled: x.packageType !== 'YOUR_PACKAGING',
                },
                ValidatorsService.required,
              ],
              height: [
                {
                  value: x.dimension.height,
                  disabled: x.packageType !== 'YOUR_PACKAGING',
                },
              ],
            }),
            insuranceDeclared: [x.insuranceDeclared],
            contentDescription: [x.contentDescription],
            numberOfPackages: [x.numberOfPackages || 1],
          })
        );
      });
    }
  }

  addPackages() {
    // this._router.navigate([this.next]);
    if (this.PackegeInfoForm.invalid) {
      this.PackegeInfoForm.markAllAsTouched();
      return;
    }
    if (this.PackegeInfoForm.valid) {
      let data = this.PackegeInfoForm.getRawValue();
      this.isloading = true;
      let item = data.packages[0].packageType;
      let typeData = this.packageslist.filter((e) => e.package_type == item);
      let type = typeData[0]?.carrierType;
      this._apiService
        .addPackage(data, this.shipmentId, type)
        .subscribe((res) => {
          if (res.isSuccess) {
            localStorage.setItem('carrierType', type);
            this.authService.storeShipmentServices(res?.data);
            this._router.navigate([this.next]);
            this.isloading = false;
          } else {
            this.isloading = false;
          }
        });
      // routerLink="/client/add-shipment/arrival-pref"
    }
  }

  selectPackage(event: any, data: any) {
    let value = event.value;
    let item = data?.dimension?.controls;
    if (value == 'FEDEX_ENVELOPE' || value == 'FEDEX_PAK') {
      item?.height?.clearValidators();
      item?.height?.updateValueAndValidity();
    } else {
      item?.height?.setValidators(ValidatorsService.required);
      item?.height?.updateValueAndValidity();
    }
    let packageInfo = this.packageDimensions.filter(
      (e) => e.PackageType == value
    );
    item?.height?.setValue(packageInfo[0]?.inch?.height);
    item?.length?.setValue(packageInfo[0]?.inch?.length);
    item?.width?.setValue(packageInfo[0]?.inch?.width);
    if (value !== 'YOUR_PACKAGING') {
      item?.height?.disable();
      item?.length?.disable();
      item?.width?.disable();
      item?.height?.setValidators(ValidatorsService.required);
      item?.height?.updateValueAndValidity();
      item?.length?.setValidators(ValidatorsService.required);
      item?.length?.updateValueAndValidity();
      item?.width?.setValidators(ValidatorsService.required);
      item?.width?.updateValueAndValidity();
      let data = this.PackegeInfoForm.getRawValue();
    } else {
      item?.height?.enable();
      item?.length?.enable();
      item?.width?.enable();
      item?.height?.clearValidators();
      item?.height?.updateValueAndValidity();
      item?.length?.clearValidators();
      item?.length?.updateValueAndValidity();
      item?.width?.clearValidators();
      item?.width?.updateValueAndValidity();
      data?.numberOfPackages?.setValue([1]);
    }
  }
  changeDimensionUnit(event: any, data: any) {
    let item = data?.dimension?.controls;
    let dimensionUnit = event.value;
    let packageInfo = this.packageDimensions.filter(
      (e) => e.PackageType == data?.packageType?.value
    );
    if (dimensionUnit == 'CM') {
      item?.height?.setValue(packageInfo[0]?.cm?.height);
      item?.length?.setValue(packageInfo[0]?.cm?.length);
      item?.width?.setValue(packageInfo[0]?.cm?.width);
    } else {
      item?.height?.setValue(packageInfo[0]?.inch?.height);
      item?.length?.setValue(packageInfo[0]?.inch?.length);
      item?.width?.setValue(packageInfo[0]?.inch?.width);
    }
  }
  close() {
    if (this.userRole?.code === User_Role.ADMIN) {
      this._router.navigate(['/admin/shipments']);
    } else if (this.userRole?.code === User_Role.USER) {
      this._router.navigate(['/client/shipments']);
    }
  }
  saveToDraft() {
    this._toasterServices.successToast('Shipment drafted successfully');
    this.close();
  }

  afterUpload(e: any) {
    this.authService.storeShipmentServices(e?.data);
    this._router.navigate([this.next]);
    this.isloading = false;
  }
}
