import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../share/components/dashboard/dashboard.component';
import { PageNotFoundComponent } from '../share/components/page-not-found/page-not-found.component';
import { ShareModule } from '../share/share.module';
import { AccoutInfoComponent } from './components/accout-info/accout-info.component';
import { AccoutTypeComponent } from './components/accout-type/accout-type.component';
import { ApplicationProffMailboxComponent } from './components/application-proof-mailbox/application-proff-mailbox.component';
import { CarrierPrefComponent } from './components/carrier-pref/carrier-pref.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { MailboxApplicationComponent } from './components/mailbox-application/mailbox-application.component';
import { PostOfficeMailboxComponent } from './components/post-office-mailbox/post-office-mailbox.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { PostOfficeMailbox2Component } from './components/post-office-mailbox/post-office-mailbox2/post-office-mailbox2.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },

  {
    path: 'account-type', component: AccoutTypeComponent
  },
  {
    path: 'account-info', component: AccoutInfoComponent
  },
  {
    path: 'proof-mailbox', component: ApplicationProffMailboxComponent
  },
  {
    path: 'post-mail-box', component: PostOfficeMailboxComponent
  },
  {
    path: 'post-mail-box2', component: PostOfficeMailbox2Component
  },
  {
    path: 'carrier-pref', component: CarrierPrefComponent
  },
  {
    path: 'mailbox', component: MailboxApplicationComponent
  },
  //  {
  //   path: '**', component : PageNotFoundComponent
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
