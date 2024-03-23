import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableComponent } from './components/table/table.component';
import { SearchPipe } from './pipes/search.pipe';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDilogBoxComponent } from './dialog-box/confirm-dilog-box/confirm-dilog-box.component';
import { MaterialModule } from './material.module';
import { NumberDirectiveModule } from '../share/only-number/number-only.directive';
const sharedComponents = [
  DashboardComponent,
  SearchPipe,
  SideBarComponent,
  ButtonComponent,
  HeaderComponent,
  FooterComponent,
  ConfirmDilogBoxComponent,
  PageNotFoundComponent,
  TableComponent,
]

@NgModule({
  declarations: [
    sharedComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NumberDirectiveModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    sharedComponents,
    FormsModule,
    MaterialModule,
    NumberDirectiveModule,
    ReactiveFormsModule,
  ]
})
export class ShareModule { }
