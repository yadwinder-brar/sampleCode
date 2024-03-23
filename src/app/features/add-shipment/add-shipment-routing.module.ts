import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewcustomerComponent } from '../admin/newcustomer/newcustomer.component';
import { AddCardComponent } from './add-card/add-card.component';
import { AddcardsComponent } from './addcards/addcards.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { AddnewpackageComponent } from './addnewpackage/addnewpackage.component';
import { ArrivalPrefComponent } from './arrival-pref/arrival-pref.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DeleteCardComponent } from './delete-card/delete-card.component';
import { DeletecardsComponent } from './deletecards/deletecards.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ForwardmailComponent } from './forwardmail/forwardmail.component';
import { ForwardmailfirstComponent } from './forwardmailfirst/forwardmailfirst.component';
import { ForwardmaillastComponent } from './forwardmaillast/forwardmaillast.component';
import { ForwarmailsubmitComponent } from './forwarmailsubmit/forwarmailsubmit.component';
import { GetcodeComponent } from './getcode/getcode.component';
import { HoldpickupComponent } from './holdpickup/holdpickup.component';
import { MyCardsComponent } from './my-cards/my-cards.component';
import { NewaddressComponent } from './newaddress/newaddress.component';
import { NotmailComponent } from './notmail/notmail.component';
import { PackegeInfoComponent } from './packege-info/packege-info.component';
import { PaySuccessComponent } from './pay-success/pay-success.component';
import { PaymentoptionsComponent } from './paymentoptions/paymentoptions.component';
import { PaymentsuccesfulComponent } from './paymentsuccesful/paymentsuccesful.component';
import { ReceiverAddressComponent } from './receiver-address/receiver-address.component';
import { SelectcardComponent } from './selectcard/selectcard.component';
import { SelectplanComponent } from './selectplan/selectplan.component';
import { SenderAddressComponent } from './sender-address/sender-address.component';
import { SendtrashComponent } from './sendtrash/sendtrash.component';
import { ShipmentDetailsComponent } from './shipment-details/shipment-details.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';


const routes: Routes = [
  { path: '', component: SenderAddressComponent },
  { path: 'sender-address', component: SenderAddressComponent },
  { path: 'res', component: ReceiverAddressComponent },
  { path: 'pakage-info', component: PackegeInfoComponent },
  { path: 'arrival-pref', component: ArrivalPrefComponent },
  { path: 'additional-info', component: AdditionalInfoComponent },
  { path: 'payment/:id', component: PaySuccessComponent,canDeactivate: [CanDeactivateGuard] },
  { path: 'payment', component: PaySuccessComponent,canDeactivate: [CanDeactivateGuard] },
  // {
  //   path: 'shipment', component: ShipmentComponent, children: [
  //     { path: '', component: MyCardsComponent },
  //     { path: 'my-cards', component: MyCardsComponent },
  //     { path: 'delete-card/:id', component: DeleteCardComponent },
  //     { path: 'pay-success', component: PaySuccessComponent },
  //     { path: 'add-card', component: AddCardComponent },
  //   ]
  // },

  { path: 'shipment-detail/:id', component: ShipmentDetailsComponent },
  // {path:'pay-success',component :PaySuccessComponent},
  // { path: 'delete-card', component: DeleteCardComponent },
  // {path:'add-card',component :AddCardComponent},
  // {path:'my-cards',component :MyCardsComponent},
  { path: 'addnewpackage', component: AddnewpackageComponent },
  { path: 'newaddress', component: NewaddressComponent },
  { path: 'forwardmail', component: ForwardmailComponent },
  { path: 'forwardmaillast', component: ForwardmaillastComponent },
  { path: 'holdpickup', component: HoldpickupComponent },
  { path: 'getcode', component: GetcodeComponent },
  { path: 'notmail', component: NotmailComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'addcards', component: AddcardsComponent },
  { path: 'selectcard', component: SelectcardComponent },
  { path: 'paymentsuccesful', component: PaymentsuccesfulComponent },
  { path: 'deletecards', component: DeletecardsComponent },
  { path: 'paymentoptions', component: PaymentoptionsComponent },
  { path: 'selectplan', component: SelectplanComponent },
  { path: 'forwardmailfirst', component: ForwardmailfirstComponent },
  { path: 'forwarmailsubmit', component: ForwarmailsubmitComponent },
  { path: 'sendtrash', component: SendtrashComponent },
  { path: 'changepassword/:id', component: ChangepasswordComponent },
  { path: 'editprofile/:id', component: EditprofileComponent },
  {path:'sender-address',component : SenderAddressComponent},
  {path:'res',component : ReceiverAddressComponent},
  {path:'pakage-info',component : PackegeInfoComponent},
  {path:'arrival-pref',component : ArrivalPrefComponent},
  {path:'additional-info',component :AdditionalInfoComponent },
  {path:'shipment',component :ShipmentComponent },
  {path:'shipment-detail',component :ShipmentDetailsComponent },
  {path:'payment',component :PaySuccessComponent},
  {path:'delete-card',component :DeleteCardComponent},
  {path:'add-card',component :AddCardComponent},
  {path:'my-cards',component :MyCardsComponent},
  {path:'addnewpackage',component :AddnewpackageComponent},
  {path:'newaddress',component :NewaddressComponent},
  {path:'forwardmail', component: ForwardmailComponent},
  { path: 'forwardmaillast', component:ForwardmaillastComponent},
  {path:'holdpickup', component: HoldpickupComponent},
  {path:'getcode', component:GetcodeComponent},
  {path:'notmail', component:NotmailComponent},
  {path:'confirmation', component:ConfirmationComponent},
  { path: 'addcards', component:AddcardsComponent},
  { path: 'selectcard', component:SelectcardComponent},
  { path: 'paymentsuccesful', component:PaymentsuccesfulComponent},
  { path: 'deletecards', component:DeletecardsComponent},
  { path: 'paymentoptions', component:PaymentoptionsComponent},
  { path: 'selectplan', component:SelectplanComponent},
  { path: 'forwardmailfirst', component:ForwardmailfirstComponent},
  { path: 'forwarmailsubmit', component:ForwarmailsubmitComponent},
  { path: 'sendtrash', component:SendtrashComponent},
  { path: 'changepassword', component:ChangepasswordComponent},
  { path: 'editprofile', component:EditprofileComponent},
  { path: 'newcustomer', component:NewcustomerComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCShipmentRoutingModule { }
