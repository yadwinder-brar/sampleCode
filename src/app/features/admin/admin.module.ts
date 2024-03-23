import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { ShareModule } from 'src/app/share/share.module';
import { FormFieldModule } from 'src/app/share/form-field/form-field.module';
import { ShipmentsComponent } from './shipments/shipments.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { MailboxrequestComponent } from './mailboxrequest/mailboxrequest.component';
import { AddresslistComponent } from './addresslist/addresslist.component';
import { InvoicesbillingComponent } from './invoicesbilling/invoicesbilling.component';
import { FaqComponent } from './faq/faq.component';
import { CarrierComponent } from './carrier/carrier.component';
import { PlanComponent } from './plan/plan.component';
import { MargindiscountComponent } from './margindiscount/margindiscount.component';
import { AnalyticsreportsComponent } from './analyticsreports/analyticsreports.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { InvitecustomerComponent } from './invitecustomer/invitecustomer.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { MailboxdetailComponent } from './mailbox/mailboxdetail/mailboxdetail.component';
import { UploadscanComponent } from './uploadscan/uploadscan.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MailboxrequestdetailComponent } from './mailboxrequest/mailboxrequestdetail/mailboxrequestdetail.component';
import { AssignmailboxComponent } from './assignmailbox/assignmailbox.component';
import { AddnewcarrierComponent } from './addnewcarrier/addnewcarrier.component';
import { AddplanComponent } from './addplan/addplan.component';
import { CustomerlistdetailsComponent } from './customerlistdetails/customerlistdetails.component';
import { Customerlistdetails1Component } from './customerlistdetails1/customerlistdetails1.component';
import { Mailboxdetails2Component } from './mailboxdetails2/mailboxdetails2.component';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { EditmarginComponent } from './editmargin/editmargin.component';
import { EditdiscountComponent } from './editdiscount/editdiscount.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { NewcustomerComponent } from './newcustomer/newcustomer.component';
import { NotificationdialogComponent } from './notificationdialog/notificationdialog.component';
import { PaginationModule } from 'src/app/share/pagination/pagination.module';
import { CustomersComponent } from './customers/customers.component';
import { ShipmentDetailComponent } from './shipments/shipment-detail/shipment-detail.component';
import { ViewShipmentDetailComponent } from './shipments/view-shipment-detail/view-shipment-detail.component';
import { AdminShipmentsComponent } from './shipments/admin-shipments/admin-shipments.component';
import { AdminMailboxRequestComponent } from './mailboxrequest/admin-mailbox-request/admin-mailbox-request.component';
import { AdminMailboxComponent } from './mailbox/admin-mailbox/admin-mailbox.component';
import { LabelDilogModule } from '../labelDialog/label.module';
import { FileUploaderModule } from 'src/app/share/file-uploader/file-uploader.module';
import { UploadScanImgaesComponent } from './mailbox/upload-scan-imgaes/upload-scan-imgaes.component';
import { NgChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ShipmentRequestComponent } from './shipment-request/shipment-request.component';
import { InvoiceCreateDialogComponent } from './invoicesbilling/invoice-create-dialog/invoice-create-dialog.component';
import { AddMailboxCountComponent } from './mailbox/mailboxdetail/add-mailbox-count/add-mailbox-count.component';
import { AssignPlanComponent } from './customerlist/assign-plan/assign-plan.component';
import { EditVipDiscountComponent } from './edit-vip-discount/edit-vip-discount.component';
import { ProInvoiceDialogComponent } from './invoicesbilling/pro-invoice-dialog/pro-invoice-dialog.component';

import { TopUpDialogComponent } from './plan/top-up-dialog/top-up-dialog.component';
import { NgxMaskModule } from 'ngx-mask';
import { DecimalDirectiveModule } from 'src/app/share/decimal-only/decimal.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PostOfficeFormDetailComponent } from './mailboxrequest/post-office-form-detail/post-office-form-detail.component';
import { DueDateDialogComponent } from './mailbox/due-date-dialog/due-date-dialog.component';
import { SubAdminComponent } from './sub-admin/sub-admin.component';
import { SubAdminDetailComponent } from './sub-admin/sub-admin-detail/sub-admin-detail.component';
import { SubAdminListComponent } from './sub-admin/sub-admin-list/sub-admin-list.component';
import { AddEditSUbadminComponent } from './add-edit-subadmin/add-edit-subadmin.component';
import { SubadminInvoicesComponent } from './sub-admin/subadmin-invoices/subadmin-invoices.component';
import { SubAdminInvoiceDialogComponent } from './sub-admin/sub-admin-invoice-dialog/sub-admin-invoice-dialog.component';
@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminComponent,
    NewcustomerComponent,
    CustomerlistComponent,
    ShipmentsComponent,
    MailboxComponent,
    MailboxrequestComponent,
    AddresslistComponent,
    InvoicesbillingComponent,
    FaqComponent,
    CarrierComponent,
    PlanComponent,
    MargindiscountComponent,
    AnalyticsreportsComponent,
    AdminHeaderComponent,
    InvitecustomerComponent,
    MailboxdetailComponent,
    UploadscanComponent,
    MailboxrequestdetailComponent,
    AssignmailboxComponent,
    AddnewcarrierComponent,
    AddplanComponent,
    CustomerlistdetailsComponent,
    Customerlistdetails1Component,
    Mailboxdetails2Component,
    AddquestionComponent,
    EditmarginComponent,  
    NotificationdialogComponent,  
    EditdiscountComponent, NotificationdialogComponent, CustomersComponent, ShipmentDetailComponent, ViewShipmentDetailComponent, AdminShipmentsComponent, AdminMailboxRequestComponent, AdminMailboxComponent, UploadScanImgaesComponent, ShipmentRequestComponent, InvoiceCreateDialogComponent, AddMailboxCountComponent, AssignPlanComponent, EditVipDiscountComponent, ProInvoiceDialogComponent, TopUpDialogComponent, PostOfficeFormDetailComponent, DueDateDialogComponent, SubAdminComponent, SubAdminDetailComponent, SubAdminListComponent, AddEditSUbadminComponent, SubadminInvoicesComponent, SubAdminInvoiceDialogComponent,
    
  ],
  imports: [
    CommonModule,
    NgOtpInputModule,
    ShareModule, 
    MatTooltipModule,
    DecimalDirectiveModule,
    PaginationModule,
    NgxMaskModule,
    FormFieldModule, 
    MatCheckboxModule,
    NgChartsModule,
    FileUploaderModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCPaWZ82O2KbXCsZwnZXq0Qe_kKu-SL_WA',
      libraries: ['places', 'drawing', 'geometry']
    }),
    MatDialogModule, 
    LabelDilogModule,    
    AdminRoutingModule,
  ]
})
export class AdminModule { }
