import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService, LocalStorageService, LoginService } from 'src/app/core/services';
import { ValidatorsService } from '../../../core/services/validation.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isLoading: boolean = false;
  newPassword: boolean = false;
  confirmPassword: boolean = false;
  signUpSub!: Subscription;
  signUpForm!: FormGroup;
  PrivacyPolicy = 'assets/images/ShipDistrictPrivacyPolicy.pdf';
  termAndCondition = 'assets/images/ShipDistrictTerms&Conditions.pdf';
  constructor(private _router: Router,
    private _loginServices: LoginService,
    private _authService: AuthService
  ) {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [ValidatorsService.required, ValidatorsService.emailValidator]),
      accept: new FormControl(false, [ValidatorsService.required]),
      password: new FormControl('', [ValidatorsService.required, ValidatorsService.minPassword]),
      conPassword: new FormControl('', [ValidatorsService.required, ValidatorsService.minPassword]),
    }, { validators: [ValidatorsService.compareValidator('password', 'conPassword'),] })
  }
  sigIn() {
    this._router.navigate(['/login']);
  }
  submit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return
    }
    if (this.signUpForm.valid) {
      this.isLoading = true;
      let data = {
        email: this.signUpForm.controls['email'].value,
        password: this.signUpForm.controls['password'].value
      }
      this.signUpSub = this._loginServices.signUp(data).subscribe((res: any) => {
        if (res.isSuccess) {
          // this._authService.storeRole(res?.role?.id);
          this._authService.storeUserId(res?.data?.id || res?.data?._id);
          this._router.navigate(['account-type']);
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      })
    }
  }
  openPrivacy(event: any) {
    window.open(this.PrivacyPolicy);
  }
  openTermAndCondition(event: any) {
    window.open(this.termAndCondition);
  }
  ngOnDestroy() {
    if (this.signUpSub) this.signUpSub.unsubscribe();
  }

}
