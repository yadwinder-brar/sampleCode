import { UnauthGuard } from './guards/unauth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor, HttpRequestInterceptor, HttpResponseInterceptor } from './interceptors';
import { AuthGuard } from './guards/auth.guard';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ShareModule
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpErrorInterceptor,
    //   multi: true,
    // },
    AuthGuard,
    UnauthGuard
  ],

})
export class CoreModule { }
