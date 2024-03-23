import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoginService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { ForgotPopupComponent } from './forgot-popup/forgot-popup.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgot!: FormGroup;
  isLoading:boolean= false;
  forgotSub!: Subscription;
  constructor(private _router: Router,
    private dialog: MatDialog,
    private _fb: FormBuilder,
    private _toaster: ToasterService,
    private _loginServices: LoginService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.forgot = this._fb.group({
      email: ['', [ValidatorsService.emailValidator, ValidatorsService.required]]
    })
  }

  next() {
    if (this.forgot.invalid){ this.forgot.markAllAsTouched(); return}
    if (this.forgot.valid) {
     this.isLoading= true;
      this.forgotSub = this._loginServices.forgotPassword(this.forgot.value).subscribe((res: any) => {
        if (res.isSuccess) {
          // this._authServices.storeUserProfile(res.data)
          this.openDialog();
          this.isLoading= false;
        } else {
          this._toaster.errorToast(res.message);
          this.isLoading= false;
        }
      })
    }


  }
  openDialog() {
    this.dialog.open(ForgotPopupComponent, {
      width: '450px',
      height: '350px',
      disableClose: true
    }).afterClosed().subscribe(data => {
      this._router.navigate(['/login']);
    })
  }
  ngOnDestroy() {
    if (this.forgotSub) this.forgotSub.unsubscribe();
  }
}
