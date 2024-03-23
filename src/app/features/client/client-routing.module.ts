import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentsComponent } from './shipments/shipments.component';
import { ClientComponent } from './client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShipmentDetailComponent } from './shipments/shipment-detail/shipment-detail.component';
import { Shippmentdetail1Component } from './shipments/shippmentdetail1/shippmentdetail1.component';
import { UploaddocumentComponent } from './shipments/uploaddocument/uploaddocument.component';
import { AddressListComponent } from './address-list/address-list.component';
import { PackagesComponent } from './packages/packages.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AccountsettingComponent } from './accountsetting/accountsetting.component';
import { HelppageComponent } from './helppage/helppage.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { InboxComponent } from './mailbox/inbox/inbox.component';
import { MatMenuModule } from '@angular/material/menu';
import { ArchiveComponent } from './mailbox/archive/archive.component';
import { TrashComponent } from './mailbox/trash/trash.component';
import { ForwardmailComponent } from '../add-shipment/forwardmail/forwardmail.component';
import { AddcardsComponent } from '../add-shipment/addcards/addcards.component';
import { AllShipmentsComponent } from './shipments/all-shipments/all-shipments.component';
import { NewaddressComponent } from '../add-shipment/newaddress/newaddress.component';
import { AddnewpackageComponent } from '../add-shipment/addnewpackage/addnewpackage.component';
import { SelectplanComponent } from '../add-shipment/selectplan/selectplan.component';
import { MailboxDashbaordComponent } from './mailbox/mailbox-dashbaord/mailbox-dashbaord.component';
import { InvoiceMailboxComponent } from './invoice-mailbox/invoice-mailbox.component';
import { EditprofileComponent } from '../add-shipment/editprofile/editprofile.component';
import { ChangepasswordComponent } from '../add-shipment/changepassword/changepassword.component';
import { ForwardmailfirstComponent } from '../add-shipment/forwardmailfirst/forwardmailfirst.component';
import { ForwardmaillastComponent } from '../add-shipment/forwardmaillast/forwardmaillast.component';
import { ForwarmailsubmitComponent } from '../add-shipment/forwarmailsubmit/forwarmailsubmit.component';

const childRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {path: 'shipments', component: ShipmentsComponent, children: [
      { path: '', component: AllShipmentsComponent },
      { path: 'shipment-detail/:id', component: ShipmentDetailComponent },
      { path: 'viewShipment-detail/:id', component: Shippmentdetail1Component },
    ]
  },
  { path: 'address-List', component: AddressListComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'mailbox-invoices', component: InvoiceMailboxComponent },
  { path: 'account-settings', component: AccountsettingComponent },
  { path: 'help', component: HelppageComponent },
  { path: 'mailbox', component: MailboxComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'trash', component: TrashComponent },
  { path: 'mailbox-dashboard', component: MailboxDashbaordComponent},
  // { path: 'dashboard', component: DashboardComponent },



];

const routes: Routes = [
  { path: "", component: ClientComponent, data: { name: "Dashboard" }, children: childRoutes },
  { path: 'upload-document', component: UploaddocumentComponent },
  { path: 'newaddress', component: NewaddressComponent },
  { path: 'edit-address/:id', component: NewaddressComponent },
  { path: 'editprofile/:id', component: EditprofileComponent },
  { path: 'changepassword/:id', component: ChangepasswordComponent },
  { path: 'addPackage', component: AddnewpackageComponent },
  { path: 'edit-Package/:id', component: AddnewpackageComponent },
  { path: 'selectplan', component: SelectplanComponent },
  { path: 'forwardmail/:id', component: ForwardmailComponent },
  { path: 'forwardmaillast/:id', component: ForwardmaillastComponent },
  { path: 'forwardmailfirst/:id', component: ForwardmailfirstComponent },
  { path: 'forwardmail', component: ForwardmailComponent },
  { path: 'forwardmaillast', component: ForwardmaillastComponent },
  { path: 'forwardmailfirst', component: ForwardmailfirstComponent },
  { path: 'forwarmailsubmit', component: ForwarmailsubmitComponent },
  {
    path: 'add-shipment', loadChildren: () =>
      import('../add-shipment/add-shipment.module').then((m) => m.AddShipmentModule)
  },

];

@NgModule({
  imports: [MatMenuModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
