import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { FormFieldModule } from 'src/app/share/form-field/form-field.module';
import { ShareModule } from 'src/app/share/share.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ShipmentsComponent } from './shipments/shipments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShipmentDetailComponent } from './shipments/shipment-detail/shipment-detail.component';
import { Shippmentdetail1Component } from './shipments/shippmentdetail1/shippmentdetail1.component';
import { UploaddocumentComponent } from './shipments/uploaddocument/uploaddocument.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AddtagsComponent } from './addtags/addtags.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PackagesComponent } from './packages/packages.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AccountsettingComponent } from './accountsetting/accountsetting.component';
import { HelppageComponent } from './helppage/helppage.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgChartsModule } from 'ng2-charts';
import { MailboxComponent } from './mailbox/mailbox.component';
import { MailboxDashbaordComponent } from './mailbox/mailbox-dashbaord/mailbox-dashbaord.component';
import { InboxComponent } from './mailbox/inbox/inbox.component';
import { ArchiveComponent } from './mailbox/archive/archive.component';
import { TrashComponent } from './mailbox/trash/trash.component';
import { OpenmodalComponent } from './mailbox/openmodal/openmodal.component';
import { ClickviewComponent } from './mailbox/clickview/clickview.component';
import { ClientDashboardHeaderComponent } from './client-dashboard-header/client-dashboard-header.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { PaginationModule } from 'src/app/share/pagination/pagination.module';
import { AllShipmentsComponent } from './shipments/all-shipments/all-shipments.component';
import { InvoiceMailboxComponent } from './invoice-mailbox/invoice-mailbox.component';
import { LabelDilogModule } from '../labelDialog/label.module';
import { RequestChangeDialogComponent } from './mailbox/request-change-dialog/request-change-dialog.component';
import { FileUploaderModule } from 'src/app/share/file-uploader/file-uploader.module';
import {MatBadgeModule} from '@angular/material/badge';
import { InvoicePayComponent } from './invoice-pay/invoice-pay.component';
import { TutorialVideosComponent } from './client-dashboard-header/tutorial-videos/tutorial-videos.component';
import { TourMatMenuModule } from 'ngx-tour-md-menu';
import { GuidedTourModule, GuidedTourService } from 'ngx-guided-tour';
import { ApplicationForComponent } from './accountsetting/application-for/application-for.component';
import { JoyrideModule } from 'ngx-joyride';


@NgModule({
  declarations: [
    ClientComponent,
    ShipmentsComponent,
    DashboardComponent,
    ShipmentDetailComponent,
    Shippmentdetail1Component,
    UploaddocumentComponent,
    AddressListComponent,
    AddtagsComponent,
    PackagesComponent,
    InvoicesComponent,
    AccountsettingComponent,
    HelppageComponent,
    MailboxComponent,
    MailboxDashbaordComponent,
    InboxComponent,
    ArchiveComponent,
    TrashComponent,
    OpenmodalComponent,
    ClickviewComponent,
    ClientDashboardHeaderComponent,
    AllShipmentsComponent,
    InvoiceMailboxComponent,
    RequestChangeDialogComponent,
    InvoicePayComponent,
    TutorialVideosComponent,
    ApplicationForComponent
  ],
  imports: [
    CommonModule,
    PaginationModule,
    FormFieldModule,
    ShareModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatDialogModule,   
    NgChartsModule,
    NgOtpInputModule,
    CdkAccordionModule,
    LabelDilogModule,
    FileUploaderModule,
    ClientRoutingModule,
    JoyrideModule.forRoot(),
    TourMatMenuModule.forRoot(),
    GuidedTourModule
  ],
  providers: [GuidedTourService]
})
export class ClientModule { }
