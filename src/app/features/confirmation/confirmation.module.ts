import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './confirmation.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ConfirmationComponent],
  exports: [ConfirmationComponent],
})
export class ConfirmationModule { }
