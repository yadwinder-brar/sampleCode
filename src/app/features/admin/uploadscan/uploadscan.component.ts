// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { EMPTY, catchError, take } from 'rxjs';
// import { ApiService, ToasterService } from 'src/app/core/services';
// import { ValidatorsService } from 'src/app/core/services/validation.service';

// @Component({
//   selector: 'app-uploadscan',
//   templateUrl: './uploadscan.component.html',
//   styleUrls: ['./uploadscan.component.css']
// })
// export class UploadscanComponent implements OnInit {
//   isLoading: boolean = true;
//   MailboxList: any = [];
//   uploadedScans: string[] = [];
//   userScanCount: any;
//   uploadScan = 'Upload Label';
//   form!: FormGroup;
//   constructor(private _fb: FormBuilder,
//     public dialogRef: MatDialogRef<UploadscanComponent>,
//     @Inject(MAT_DIALOG_DATA) public dialogData: any,
//     private _apiServices: ApiService,
//     private _toasterService: ToasterService,

//   ) {
//     // this.dialogData;
//   }

//   ngOnInit(): void {
//     this.getMailboxlist();
//     this.createForm();
//   }
//   createForm() {
//     this.form = this._fb.group({
//       virtualId: [this.dialogData?.uniqueId ? this.dialogData?.uniqueId : '', [ValidatorsService.selectRequired]],
//       labelOriginType: ['', [ValidatorsService.selectRequired]],
//       storageDate: [''],
//       labelLink: ['', [ValidatorsService.selectRequired]]
//     })
//   }
//   mailBoxTypeChange(event: any) {
//     if (event?.value == 'package') {
//       this.form.get('storageDate')?.setValidators(ValidatorsService.selectRequired);
//       this.form.get('storageDate')?.updateValueAndValidity();
//     } else {
//       this.form.get('storageDate')?.clearValidators();
//       this.form.get('storageDate')?.updateValueAndValidity();
//     }
//   }
//   getMailboxlist() {
//     this.isLoading = true
//     this._apiServices.getApprovedMailboxList().subscribe(res => {
//       if (res?.isSuccess) {
//         this.MailboxList = res?.items
//         // if (this.dialogData?.uniqueId) {
//         //    let data = this.MailboxList.filter((e: any) => e.virtualId == this.dialogData?.uniqueId);
//         //   this.getMailboxCount(data[0]?.user?.id);
//         // }
//         this.isLoading = false;
//       } else {
//         this.isLoading = false;
//       }
//     })
//   }
//   // onUserChange(event: any) {
//   //   let data = this.MailboxList.filter((e: any) => e.virtualId == event?.value);
//   //   let userId = data[0]?.user?.id;
//   //   this.getMailboxCount(userId)
//   // }
//   // getMailboxCount(id: any) {
//   //   this._apiServices.getMailboxScansCount(id).subscribe(res => {
//   //     if (res?.isSuccess) {
//   //       this.userScanCount = res?.data?.totalCount
//   //     } else {

//   //     }
//   //   })
//   // }

//   selectFile(event: any) {
//     if (event) {
//       let data = event[0]
//       this.form.get('labelLink')?.setValue(data);
//       // this.uploadedScans.push(data);
//     }
//   }
//   removeScan(data:any){
//     let index= this.uploadedScans.findIndex(e=>data)
//     this.uploadedScans.splice(index, 1);
//   }
//   uploadLabel() {
//     if (this.form?.invalid) {
//       this.form.markAllAsTouched();
//       // if(this.uploadedScans.length==0)alert('Please upload scans');
//       return
//     }
//     if (this.form.valid) {
//       this.isLoading = true;
//       this._apiServices.assignLabel(this.form.value).pipe(
//         catchError((error) => {
//           error ? this.isLoading = false : ''
//           this._toasterService.errorToast(error?.message);
//           return EMPTY;
//         }), take(1)
//       ).subscribe(res => {
//         if (res?.isSuccess) {
//           this.isLoading = false;
//           this.dialogRef.close(true)
//         } else {
//           this.isLoading = false;
//         }
//       })
//     }
//   }


//   // uploadLabel() {
//   //   if (this.form?.invalid || this.uploadedScans.length==0) {
//   //     this.form.markAllAsTouched();
//   //     if(this.uploadedScans.length==0)alert('Please upload scans');
//   //     return
//   //   }
//   //   if (this.form.valid&& this.uploadedScans.length>0) {
//   //     this.isLoading = true;
//   //     this._apiServices.assignLabel(this.form.value).pipe(
//   //       catchError((error) => {
//   //         error ? this.isLoading = false : ''
//   //         this._toasterService.errorToast(error?.message);
//   //         return EMPTY;
//   //       }), take(1)
//   //     ).subscribe(res => {
//   //       if (res?.isSuccess) {
//   //         this.isLoading = false;
//   //         this.dialogRef.close(true)
//   //       } else {
//   //         this.isLoading = false;
//   //       }
//   //     })
//   //   }
//   // }




// }









import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY, catchError, take } from 'rxjs';
import { ApiService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-uploadscan',
  templateUrl: './uploadscan.component.html',
  styleUrls: ['./uploadscan.component.css']
})
export class UploadscanComponent implements OnInit {
  isLoading: boolean = true;
  MailboxList: any = [];
  uploadedScans: string[] = [];
  userScanCount: any;
  uploadScan = 'Upload Label';
  form!: FormGroup;
  constructor(private _fb: FormBuilder,
    public dialogRef: MatDialogRef<UploadscanComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private _apiServices: ApiService,
    private _toasterService: ToasterService,

  ) {
    // this.dialogData;
  }

  ngOnInit(): void {
    this.getMailboxlist();
    this.createForm();
  }
  createForm() {
    this.form = this._fb.group({
      virtualId: [this.dialogData?.uniqueId ? this.dialogData?.uniqueId : '', [ValidatorsService.selectRequired]],
      labelOriginType: ['', [ValidatorsService.selectRequired]],
      storageDate: [''],
      labelLink: ['', []]
    })
  }
  mailBoxTypeChange(event: any) {
    if (event?.value == 'package') {
      this.form.get('storageDate')?.setValidators(ValidatorsService.selectRequired);
      this.form.get('storageDate')?.updateValueAndValidity();
    } else {
      this.form.get('storageDate')?.clearValidators();
      this.form.get('storageDate')?.updateValueAndValidity();
    }
  }
  getMailboxlist() {
    this.isLoading = true
    this._apiServices.getApprovedMailboxList().subscribe(res => {
      if (res?.isSuccess) {
        this.MailboxList = res?.items
        // if (this.dialogData?.uniqueId) {
        //    let data = this.MailboxList.filter((e: any) => e.virtualId == this.dialogData?.uniqueId);
        //   this.getMailboxCount(data[0]?.user?.id);
        // }
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    })
  }
  // onUserChange(event: any) {
  //   let data = this.MailboxList.filter((e: any) => e.virtualId == event?.value);
  //   let userId = data[0]?.user?.id;
  //   this.getMailboxCount(userId)
  // }
  // getMailboxCount(id: any) {
  //   this._apiServices.getMailboxScansCount(id).subscribe(res => {
  //     if (res?.isSuccess) {
  //       this.userScanCount = res?.data?.totalCount
  //     } else {

  //     }
  //   })
  // }

  selectFile(event: any) {
    if (event) {
      let data = event[0]
      // this.form.get('labelLink')?.setValue(data);
      this.uploadedScans.push(data);
    }
  }
  removeScan(data: any) {
    let index = this.uploadedScans.findIndex(e => data)
    this.uploadedScans.splice(index, 1);
  }
  uploadLabel() {
    if (this.form?.invalid || this.uploadedScans.length == 0) {
      this.form.markAllAsTouched();
      if (this.uploadedScans.length == 0) alert('Please upload scans');
      return
    }
    if (this.form.valid && this.uploadedScans.length > 0) {
      this.isLoading = true;
      let data: any = {
        labelLinks: this.uploadedScans,
        virtualId: this.form?.value?.virtualId,
        labelOriginType: this.form?.value?.labelOriginType,
        storageDate:this.form?.value?.storageDate
      };
      if (this.uploadedScans.length == 1) {
        data.labelLink = this.uploadedScans[0];
        data.type = 'single';
        delete data.labelLinks;
      }
      this._apiServices.assignLabel(data).pipe(
        catchError((error) => {
          error ? this.isLoading = false : ''
          this._toasterService.errorToast(error?.message);
          return EMPTY;
        }), take(1)
        ).subscribe(res => {
          if (res?.isSuccess) {
            this.isLoading = false;
            this._toasterService.successToast('label uploaded successfully');
            this.dialogRef.close(true)
        } else {
          this.isLoading = false;
        }
      })
    }
  }


}
