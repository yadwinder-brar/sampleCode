import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddplanComponent } from './addplan/addplan.component';
// import { ShipmentComponent } from '../add-shipment/shipment/shipment.component';
import { AddresslistComponent } from './addresslist/addresslist.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { AnalyticsreportsComponent } from './analyticsreports/analyticsreports.component';
import { CarrierComponent } from './carrier/carrier.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { CustomerlistdetailsComponent } from './customerlistdetails/customerlistdetails.component';
import { Customerlistdetails1Component } from './customerlistdetails1/customerlistdetails1.component';
import { FaqComponent } from './faq/faq.component';
import { InvoicesbillingComponent } from './invoicesbilling/invoicesbilling.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { MailboxdetailComponent } from './mailbox/mailboxdetail/mailboxdetail.component';
import { Mailboxdetails2Component } from './mailboxdetails2/mailboxdetails2.component';
import { MailboxrequestComponent } from './mailboxrequest/mailboxrequest.component';
import { MailboxrequestdetailComponent } from './mailboxrequest/mailboxrequestdetail/mailboxrequestdetail.component';
import { MargindiscountComponent } from './margindiscount/margindiscount.component';
import { NewcustomerComponent } from './newcustomer/newcustomer.component';
import { PlanComponent } from './plan/plan.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { NewaddressComponent } from '../add-shipment/newaddress/newaddress.component';
import { CustomersComponent } from './customers/customers.component';
import { ViewShipmentDetailComponent } from './shipments/view-shipment-detail/view-shipment-detail.component';
import { AdminShipmentsComponent } from './shipments/admin-shipments/admin-shipments.component';
import { ShipmentDetailComponent } from './shipments/shipment-detail/shipment-detail.component';
import { AdminMailboxRequestComponent } from './mailboxrequest/admin-mailbox-request/admin-mailbox-request.component';
import { AdminMailboxComponent } from './mailbox/admin-mailbox/admin-mailbox.component';
import { ShipmentRequestComponent } from './shipment-request/shipment-request.component';
import { SubAdminComponent } from './sub-admin/sub-admin.component';
import { SubAdminListComponent } from './sub-admin/sub-admin-list/sub-admin-list.component';
import { SubAdminDetailComponent } from './sub-admin/sub-admin-detail/sub-admin-detail.component';
import { AddEditSUbadminComponent } from './add-edit-subadmin/add-edit-subadmin.component';
import { SubadminInvoicesComponent } from './sub-admin/subadmin-invoices/subadmin-invoices.component';

const childRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'customerlist', component: CustomersComponent ,children: [
    { path: '', component: CustomerlistComponent },
    { path: 'customer-detail/:id', component:  CustomerlistdetailsComponent},
  { path: 'customers-Shipmentdetail/:id', component:  Customerlistdetails1Component},
  ] },
  { path: 'subAdmins', component: SubAdminComponent ,children: [
    { path: '', component:SubAdminListComponent },
    { path: 'subAdmin-detail/:id', component:SubAdminDetailComponent },
  ] },
  {
    path: 'shipments', component: ShipmentsComponent, children: [
      { path: '', component: AdminShipmentsComponent },
      { path: 'shipment-detail/:id', component: ShipmentDetailComponent },
      { path: 'viewShipment-detail/:id', component: ViewShipmentDetailComponent },
    ]
  },
  { path: 'shipment-request', component: ShipmentRequestComponent },
  { path: 'mailbox', component: MailboxComponent, children: [
    { path: '', component: AdminMailboxComponent },
    { path: 'mailboxdetail/:id', component:  MailboxdetailComponent},
    { path: 'forwardmailboxdetail/:id', component:  Mailboxdetails2Component},
  ] },
  { path: 'mailboxrequest', component: MailboxrequestComponent, children: [
    { path: '', component: AdminMailboxRequestComponent },
    { path: 'mailboxrequestdetail/:id', component:  MailboxrequestdetailComponent},
  ] },
  { path: 'addresslist', component: AddresslistComponent},
  { path: 'invoicesbilling', component:  InvoicesbillingComponent},
  { path: 'subAdmin-invoices', component:  SubadminInvoicesComponent},
  { path: 'faq', component:  FaqComponent},
  { path: 'carrier', component:  CarrierComponent},
  { path: 'plan', component:  PlanComponent},
  { path: 'margindiscount', component:  MargindiscountComponent},
  { path: 'analyticsreports', component:  AnalyticsreportsComponent},
  
];

const routes: Routes = [
  { path: "", component: AdminComponent,data:{name:"Dashboard"}, children: childRoutes },
  { path: 'newcustomer', component: NewcustomerComponent },
  { path: 'newSubAdmin', component: AddEditSUbadminComponent },
  { path: 'newaddress', component: NewaddressComponent },
  { path: 'edit-address/:id', component: NewaddressComponent },
  { path: 'addplan', component: AddplanComponent },
  { path: 'editplan/:id', component: AddplanComponent },
  {
    path: 'add-shipment', loadChildren: () =>
      import('../add-shipment/add-shipment.module').then((m) => m.AddShipmentModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
