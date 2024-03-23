import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCShipmentRoutingModule } from './add-shipment-routing.module';
import { ShipmentComponent } from './shipment/shipment.component';
import { SenderAddressComponent } from './sender-address/sender-address.component';
import { ReceiverAddressComponent } from './receiver-address/receiver-address.component';
// import { AddressComponent } from './address/address.component';
import { PackegeInfoComponent } from './packege-info/packege-info.component';
import { ArrivalPrefComponent } from './arrival-pref/arrival-pref.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { PaymentComponent } from './payment/payment.component';
import { AddCardComponent } from './add-card/add-card.component';
import { PaySuccessComponent } from './pay-success/pay-success.component';
import { ShipmentDetailsComponent } from './shipment-details/shipment-details.component';
import { FormFieldModule } from 'src/app/share/form-field/form-field.module';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { MatSelectModule } from '@angular/material/select';
import { DeleteCardComponent } from './delete-card/delete-card.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MaterialModule } from 'src/app/share/material.module';
import { MyCardsComponent } from './my-cards/my-cards.component';
import { AddnewpackageComponent } from './addnewpackage/addnewpackage.component';
import { NewaddressComponent } from './newaddress/newaddress.component';
import { ForwardmailComponent } from './forwardmail/forwardmail.component';
import { HoldpickupComponent } from './holdpickup/holdpickup.component';
import { GetcodeComponent } from './getcode/getcode.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { NotmailComponent } from './notmail/notmail.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AddcardsComponent } from './addcards/addcards.component';
import { SelectcardComponent } from './selectcard/selectcard.component';
import { PaymentsuccesfulComponent } from './paymentsuccesful/paymentsuccesful.component';
import { DeletecardsComponent } from './deletecards/deletecards.component';
import { PaymentoptionsComponent } from './paymentoptions/paymentoptions.component';
import { SelectplanComponent } from './selectplan/selectplan.component';
import { ForwardmailfirstComponent } from './forwardmailfirst/forwardmailfirst.component';
import { ForwarmailsubmitComponent } from './forwarmailsubmit/forwarmailsubmit.component';
import { SendtrashComponent } from './sendtrash/sendtrash.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ForwardmaillastComponent } from './forwardmaillast/forwardmaillast.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberDirectiveModule } from 'src/app/share/only-number/number-only.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { TwoDigitDecimaNumberDirective } from './decimalDirective2/decimalDirective';
import { TooltippositionComponent } from './tooltipposition/tooltipposition.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DisableControlDirective } from './disableDirective/disableControls';
import { FileUploaderModule } from "../../share/file-uploader/file-uploader.module";
import { NgxMaskModule } from 'ngx-mask';
// import { NewcustomerComponent } from '../admin/newcustomer/newcustomer.component';
// import { NewcustomerComponent } from './newcustomer/newcustomer.component';

@NgModule({
    declarations: [
        ShipmentComponent,
        TwoDigitDecimaNumberDirective,
        DisableControlDirective,
        SenderAddressComponent,
        ReceiverAddressComponent,
        PackegeInfoComponent,
        ArrivalPrefComponent,
        AdditionalInfoComponent,
        PaymentComponent,
        AddCardComponent,
        PaySuccessComponent,
        ShipmentDetailsComponent,
        DeleteCardComponent,
        MyCardsComponent,
        AddnewpackageComponent,
        NewaddressComponent,
        ForwardmailComponent,
        HoldpickupComponent,
        GetcodeComponent,
        NotmailComponent,
        ConfirmationComponent,
        AddcardsComponent,
        SelectcardComponent,
        PaymentsuccesfulComponent,
        DeletecardsComponent,
        PaymentoptionsComponent,
        SelectplanComponent,
        ForwardmailfirstComponent,
        ForwarmailsubmitComponent,
        SendtrashComponent,
        ChangepasswordComponent,
        EditprofileComponent,
        ForwardmaillastComponent,
        AddAddressComponent,
        TooltippositionComponent,
        // NewcustomerComponent,
    ],
    imports: [
        CommonModule,
        FormFieldModule,
        MatProgressSpinnerModule,
        NumberDirectiveModule,
        MatProgressBarModule,
        MatSelectModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MaterialModule,
        NgOtpInputModule,
        MatTooltipModule,
        NgxMaskModule,
        AddCShipmentRoutingModule,
        FileUploaderModule
    ]
})
export class AddShipmentModule { }
