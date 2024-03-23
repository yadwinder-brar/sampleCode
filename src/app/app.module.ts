import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { CoreModule } from './core/core.module';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskModule }  from  'ngx-mask';
import { AgmCoreModule } from '@agm/core';
import { TourMatMenuModule } from 'ngx-tour-md-menu';
import { GuidedTourModule, GuidedTourService } from 'ngx-guided-tour';
import { JoyrideModule } from 'ngx-joyride';
@NgModule({
  declarations: [
    AppComponent,   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,

    ToastNotificationsModule.forRoot({
      preventDuplicates: true
    }),
    NgxMaskModule.forRoot({
      // clearIfNotMatch : false
    }),
    AgmCoreModule.forRoot({
      apiKey: 'your google map key',
      libraries: ['places', 'drawing', 'geometry']
    }),
    JoyrideModule.forRoot(),
    BrowserAnimationsModule,
    NgChartsModule,
    TourMatMenuModule.forRoot(),
    GuidedTourModule
  ],
  providers: [DatePipe, GuidedTourService],  
  bootstrap: [AppComponent]
})
export class AppModule { }
