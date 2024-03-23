import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field.component';

const exports = [FormFieldComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [exports],
  exports: [exports],
})
export class FormFieldModule { }
