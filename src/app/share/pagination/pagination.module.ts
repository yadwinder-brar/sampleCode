import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { MatSelectModule } from '@angular/material/select';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
  ],
  declarations: [PaginationComponent],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule { }
