import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, AuthService, ToasterService } from 'src/app/core/services';
import { AcountTypeService } from '../../services/acount-type.service';

@Component({
  selector: 'app-application-proff-mailbox',
  templateUrl: './application-proff-mailbox.component.html',
  styleUrls: ['./application-proff-mailbox.component.css']
})
export class ApplicationProffMailboxComponent implements OnInit {
  firstProffImg: any;
  secProffImg: any;
  isLoading: boolean = false
  profile: any;
  postOfficeForm: any;
  constructor(private _router: Router,
    private _apiServices: ApiService,
    private _acount: AcountTypeService,
    private _authService: AuthService,
    private _toaster: ToasterService
  ) {
    // this._acount.formUrl$.subscribe(data => {
    //   this.postOfficeForm = data ? data : '';
    // });
// this.postOfficeForm = localStorage.getItem('postOfficeForm');
//     if (!this.postOfficeForm) {
//       // this._router.navigate(['/post-mail-box'])
//     }
    let userProfile = this._authService.getUserProfile();
    this.profile = userProfile?.profiles?.filter((p: any) => p.accountType === "virtualMailBox");
    if (!this.profile) {
      this._router.navigate(['/sign-up'])
      // this.profile = [{ id: 123456789 }]
    }
  }

  ngOnInit(): void {
  }

  next() {
    if (this.firstProffImg && this.secProffImg) {
      let data = {
        "proofDocument": {
          "documents": [
            { "name": "firstProof", "url": this.firstProffImg },
            { "name": "secondProof", "url": this.secProffImg }
          ]
        },
      }
      this.isLoading = true;
      this._apiServices.addProfileDocs(data, this.profile[0].id).subscribe(data => {
        if (data.isSuccess) {
        let accountType = localStorage.getItem('accountType');
          if(accountType=='virtualMailBox'){
            this._router.navigate(['/mailbox'])
          }else{
            this._router.navigate(['/carrier-pref'])
          }
          this.isLoading = false
          
        } else {
          this._toaster.errorToast('file upload failed');
          this.isLoading = false
        }
      })
    } else {
      if (!this.postOfficeForm) {
        this._toaster.errorToast('Please upload postOffice form and documents');
        return
      }
      this._toaster.errorToast('Please upload documents');
    }
  }
  removeImage() {

  }
  proof1Upload(event: any) {
    this.firstProffImg = event[0];
  }
  proof2Upload(event: any) {
    console.log(event);
    this.secProffImg = event[0];

  }

  goTo(){
    window.open('https://calendly.com/', "_blank");
  }
}
