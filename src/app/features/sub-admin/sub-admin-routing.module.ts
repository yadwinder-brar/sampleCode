import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubAdminComponent } from './sub-admin/sub-admin.component';
import { SubAdminDashboardComponent } from './sub-admin-dashboard/sub-admin-dashboard.component';
import { SubAdminInvoicesComponent } from './sub-admin-invoices/sub-admin-invoices.component';
import { SubAdminMandatoryInvoicesComponent } from './sub-admin-mandatory-invoices/sub-admin-mandatory-invoices.component';
import { SubAdminMailboxComponent } from './sub-admin-mailbox/sub-admin-mailbox.component';
import { SubAdminCustomerlistComponent } from './sub-admin-customerlist/sub-admin-customerlist.component';
import { SubAdminMailboxRequestComponent } from './sub-admin-mailbox-request/sub-admin-mailbox-request.component';
import { SubAdminPlansComponent } from './sub-admin-plans/sub-admin-plans.component';
import { SubAdminMailboxListComponent } from './sub-admin-mailbox/sub-admin-mailbox-list/sub-admin-mailbox-list.component';
import { SubAdminMailboxDetailComponent } from './sub-admin-mailbox/sub-admin-mailbox-detail/sub-admin-mailbox-detail.component';
import { SubAdminMailboxFrowardDetailComponent } from './sub-admin-mailbox/sub-admin-mailbox-froward-detail/sub-admin-mailbox-froward-detail.component';
import { SubadminMailboxRequestListComponent } from './sub-admin-mailbox-request/subadmin-mailbox-request-list/subadmin-mailbox-request-list.component';
import { SubadminMailboxRequestDetailComponent } from './sub-admin-mailbox-request/subadmin-mailbox-request-detail/subadmin-mailbox-request-detail.component';
import { SubAdminCustomerDetailComponent } from './sub-admin-customerlist/sub-admin-customer-detail/sub-admin-customer-detail.component';
import { SubAdminNewcustomerComponent } from './sub-admin-newcustomer/sub-admin-newcustomer.component';
import { SubAdminCustomerComponent } from './sub-admin-customerlist/sub-admin-customer/sub-admin-customer.component';
import { SubAdminAddPlanComponent } from './sub-admin-plans/subAdmin-add-plan/subAdmin-add-plan.component';
import { SubadminAccountSettingComponent } from './subAdmin-account-setting/subadmin-account-setting.component';



const childRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: SubAdminDashboardComponent },
  { path: 'userList', component: SubAdminDashboardComponent },
  // { path: 'customerlist', component: SubAdminCustomerlistComponent },
  { path: 'mandatry-invoice', component: SubAdminMandatoryInvoicesComponent },

  // { path: 'customerlist', component: SubAdminCustomerComponent ,children: [
  {
    path: 'customerlist', component: SubAdminCustomerComponent, children: [
      {path: '', component: SubAdminCustomerlistComponent,},
      { path: 'customerdetail/:id', component: SubAdminCustomerDetailComponent },
    ]
  },
  {
    path: 'mailbox', component: SubAdminMailboxComponent, children: [
      { path: '', component: SubAdminMailboxListComponent },
      { path: 'mailboxdetail/:id', component: SubAdminMailboxDetailComponent },
      { path: 'forwardmailboxdetail/:id', component: SubAdminMailboxFrowardDetailComponent },
    ]
  },
  {
    path: 'mailbox-request', component: SubAdminMailboxRequestComponent, children: [
      { path: '', component: SubadminMailboxRequestListComponent },
      { path: 'mailboxrequestdetail/:id', component: SubadminMailboxRequestDetailComponent },
    ]
  },
  { path: 'invoices', component: SubAdminInvoicesComponent },
  { path: 'plan', component: SubAdminPlansComponent },
  { path: 'account-settings', component: SubadminAccountSettingComponent },

]

const routes: Routes = [

  { path: "", component: SubAdminComponent, children: childRoutes },
  { path: 'newcustomer', component: SubAdminNewcustomerComponent },
  { path: 'addPlan', component: SubAdminAddPlanComponent },
  { path: 'editPlan/:id', component: SubAdminAddPlanComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubAdminRoutingModule { }
