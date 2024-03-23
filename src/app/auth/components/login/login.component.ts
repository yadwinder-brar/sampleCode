import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService } from 'src/app/core/services';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  EmailLabel: string = '';
  Password: boolean = false;
  isLoading: boolean = false;
  buttonClass: string = 'testClass';
  loginSub!: Subscription;
  constructor(private _fb: FormBuilder,
    private _router: Router,
    private _loginServices: LoginService,
    private _authService: AuthService,
    private _toasterServices: ToasterService
  ) {
    localStorage.removeItem('accountType' )
    localStorage.clear();
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = this._fb.group({
      email: ['', [ValidatorsService.required, ValidatorsService.emailValidator]],
      password: ['', [ValidatorsService.required, ValidatorsService.minPassword]]
    })
  }
  login() {
    // console.log(this.loginForm.value)
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return
    }
    // this.loginForm.reset();
    if (this.loginForm.valid) {
      this.isLoading = true
      this.loginSub = this._loginServices.login(this.loginForm.value).subscribe((res: any) => {
        if (res.isSuccess) {
          this.isLoading = false
          this._authService.storeUserProfile(res.data);
          this._authService.storeUserId(res.data.id);
          this._authService.storeAuthToken(res.data.accessToken);
          res?.data?.role?.code == "SUPER_ADMIN"?
            this._router.navigate(['admin']):res?.data?.role?.code == "SUB_ADMIN"?this._router.navigate(['subAdmin']):this.goToClientDashboard(res?.data);
        } else {
          this.isLoading = false
        }
      })
    }
  }
  goToClientDashboard(userData:any){
    let mailboxProfile = userData?.profiles.filter((x:any)=>x.accountType=='virtualMailBox');
    let shipmentProfile = userData?.profiles.filter((x:any)=>x.accountType=='shipment');
    if(shipmentProfile && shipmentProfile[0]?.isShipmentAccountVerified){
      this._router.navigate(['client/dashboard'])
    }else if(mailboxProfile && mailboxProfile[0]?.isMailBoxAccountVerified){
       this._router.navigate(['client/mailbox-dashboard'])
    }else{
      this._toasterServices.errorToast('your account is not verified yet');
    }
    
    }
    goToSubAdmin(userData:any){

    }

  goTO() {
    this._router.navigate(['/sign-up'])
  }

  forgot() {
    this._router.navigate(['/forgot-password'])
  }

  ngOnDestroy() {
    if (this.loginSub) this.loginSub.unsubscribe();
  }

}
