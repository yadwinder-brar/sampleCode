import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService, AuthService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPassForm!: FormGroup;
  EmailLabel: string = '';
  id:any;
  Password: boolean = false;
  conPassword:boolean = false
  isLoading: boolean = false;
  buttonClass: string = 'testClass';
  restSub!: Subscription;
  constructor(private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _loginServices: LoginService,
    private _authService: AuthService
  ) { 

   this.id = this._route.snapshot.queryParams['id']
    let isAccount = this._route.snapshot.queryParams['isAccount']
    if(!this.id || !isAccount){
      this._router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.resetPassForm = this._fb.group({
      password: ['', [ValidatorsService.required, ValidatorsService.minPassword]],
      confirmPassword: ['', [ValidatorsService.required,ValidatorsService.minPassword]]
    },{ validators: [ValidatorsService.compareValidator('password', 'confirmPassword'),] })
  }
  resetPassword() {

    if (this.resetPassForm.invalid) {
      this.resetPassForm.markAllAsTouched();
      return
    }
    // this.resetPassForm.reset();
    if (this.resetPassForm.valid) {
      this.isLoading = true

      let data = {
        password :this.resetPassForm.controls['password'].value
      }
      this.restSub = this._loginServices.resetPassword(data,this.id).subscribe((res: any) => {
        if (res.isSuccess) {
          this.isLoading = false
          // this._authService.storeUserProfile(res);
          this._router.navigate(['login']);
        } else {
          this.isLoading = false
        }
      })
    }
  }

  goTO() {
    this._router.navigate(['/sign-up'])
  }


  ngOnDestroy() {
    if (this.restSub) this.restSub.unsubscribe();
  }

}
