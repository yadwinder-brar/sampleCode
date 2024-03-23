import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubAdminRoutingModule } from './sub-admin-routing.module';
import { SubAdminComponent } from './sub-admin/sub-admin.component';
import { AgmCoreModule } from '@agm/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgChartsModule } from 'ng2-charts';
import { NgxMaskModule } from 'ngx-mask';
import { DecimalDirectiveModule } from 'src/app/share/decimal-only/decimal.directive';
import { FileUploaderModule } from 'src/app/share/file-uploader/file-uploader.module';
import { FormFieldModule } from 'src/app/share/form-field/form-field.module';
import { PaginationModule } from 'src/app/share/pagination/pagination.module';
import { ShareModule } from 'src/app/share/share.module';
import { LabelDilogModule } from '../labelDialog/label.module';
import { SubAdminDashboardComponent } from './sub-admin-dashboard/sub-admin-dashboard.component';
import { SubAdminHeaderComponent } from './sub-admin-header/sub-admin-header.component';
import { SubAdminInvoicesComponent } from './sub-admin-invoices/sub-admin-invoices.component';
import { SubAdminMandatoryInvoicesComponent } from './sub-admin-mandatory-invoices/sub-admin-mandatory-invoices.component';
import { SubAdminEditProfileComponent } from './sub-admin-edit-profile/sub-admin-edit-profile.component';
import { SubAdminMailboxComponent } from './sub-admin-mailbox/sub-admin-mailbox.component';
import { SubAdminCustomerlistComponent } from './sub-admin-customerlist/sub-admin-customerlist.component';
import { SubAdminMailboxRequestComponent } from './sub-admin-mailbox-request/sub-admin-mailbox-request.component';
import { SubAdminCreateInvoiceComponent } from './sub-admin-invoices/sub-admin-create-invoice/sub-admin-create-invoice.component';
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
import { SubAdminAddTopUpComponent } from './sub-admin-plans/subAdmin-add-topUp/subAdmin-add-topUp.component';
import { BankDetailUpdateComponent } from './sub-admin/bank-detail-update/bank-detail-update.component';
import { SubadminAccountSettingComponent } from './subAdmin-account-setting/subadmin-account-setting.component';
import { SubAdminSalesTaxEditComponent } from './subAdmin-account-setting/subAdmin-salesTax-edit/subAdmin-salesTax-edit.component';


@NgModule({
  declarations: [
    SubAdminComponent,
    SubAdminDashboardComponent,
    SubAdminHeaderComponent,
    SubAdminInvoicesComponent,
    SubAdminMandatoryInvoicesComponent,
    SubAdminEditProfileComponent,
    SubAdminMandatoryInvoicesComponent,
    SubAdminMailboxComponent,
    SubAdminMailboxComponent,
    SubAdminCustomerlistComponent,
    SubAdminMailboxRequestComponent,
    SubAdminCreateInvoiceComponent,
    SubAdminPlansComponent,
    SubAdminMailboxListComponent,
    SubAdminMailboxDetailComponent,
    SubAdminMailboxFrowardDetailComponent,
    SubadminMailboxRequestListComponent,
    SubadminMailboxRequestDetailComponent,
    SubAdminCustomerDetailComponent,
    SubAdminNewcustomerComponent,
    SubAdminCustomerComponent,
    SubAdminAddPlanComponent,
    SubAdminAddTopUpComponent,
    BankDetailUpdateComponent,
    SubadminAccountSettingComponent,
    SubAdminSalesTaxEditComponent,
  ],
  imports: [
    CommonModule,
    SubAdminRoutingModule,
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
    ShareModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCPaWZ82O2KbXCsZwnZXq0Qe_kKu-SL_WA',
      libraries: ['places', 'drawing', 'geometry']
    }),
    MatDialogModule, 
    LabelDilogModule,
  ]
})
export class SubAdminModule { }
