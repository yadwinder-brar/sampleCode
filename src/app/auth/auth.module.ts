import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ShareModule } from "../share/share.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SideImgComponent } from './components/side-img/side-img.component';
import { ImgBorderComponent } from './components/img-border/img-border.component';
import { AccoutTypeComponent } from './components/accout-type/accout-type.component';
import { AccoutInfoComponent } from './components/accout-info/accout-info.component';
import { CarrierPrefComponent } from './components/carrier-pref/carrier-pref.component';
// import { SignupSuccessComponent } from './components/signup-success/signup-success.component';
import { PostOfficeMailboxComponent } from './components/post-office-mailbox/post-office-mailbox.component';
import { ApplicationProffMailboxComponent } from './components/application-proof-mailbox/application-proff-mailbox.component';
import { FormFieldModule } from '../share/form-field/form-field.module';
import { MailboxApplicationComponent } from './components/mailbox-application/mailbox-application.component';
import { ForgotPopupComponent } from './components/forgot-password/forgot-popup/forgot-popup.component';
import { FileUploaderModule } from '../share/file-uploader/file-uploader.module';
import { NgxMaskModule } from 'ngx-mask';
import { HomeComponent } from './components/home/home.component';
import { PostOfficeMailbox2Component } from './components/post-office-mailbox/post-office-mailbox2/post-office-mailbox2.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    SideImgComponent,
    ImgBorderComponent,
    AccoutTypeComponent,
    AccoutInfoComponent,
    CarrierPrefComponent,
    PostOfficeMailboxComponent,
    ApplicationProffMailboxComponent,
    MailboxApplicationComponent,
    ForgotPopupComponent,
    HomeComponent,
    PostOfficeMailbox2Component
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ShareModule,
    MatDatepickerModule,
    FormsModule,
    NgxMaskModule,
    ReactiveFormsModule,
    FormFieldModule,
    FileUploaderModule
  ]
})
export class AuthModule { }
