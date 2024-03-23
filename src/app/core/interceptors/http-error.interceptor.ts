import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services';
// import { ToasterService } from '../services/toaster.service';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
    // private toasterService: ToasterService,

  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('i18n')) return next.handle(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // this.loaderService.hideSpinner();
        const errorMessageObj = error.error?.err ? error.error?.err[0]?.errorMessage[0] : null;

        const errorCode = typeof errorMessageObj == 'string' ? errorMessageObj?.toLowerCase() : null;

        const isUnAuthorized = error.status === 401 || errorCode === "invalidtoken" || errorCode === "invaliduser";
        if (isUnAuthorized) {

          // unauthorized route to login
          this.authService.logout();




          return throwError(error);
        } else {
          const apiMessage = typeof errorMessageObj == 'object' ? errorMessageObj.message?.toLowerCase() : null;
          const pageNotExist = apiMessage == "pageidnotfound";
          if (pageNotExist) {

            this.authService.logout();
            return throwError(error);
          } else {

            const message = this.getServerErrorMessage(error);
           
            return throwError(message);
          }
        }

      })
    );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    let message;
    if (error.status === 404) {
      message = '';
    } else if (error.status === 500) {
      message = '';
    } else if ([0, 503, 504].includes(error.status)) {
      message = '';
    } else {
      if (!navigator.onLine) return '';

      message = '';

      if (error.error.err) {
        const errorMessageObj = error.error?.err ? error.error?.err[0]?.errorMessage[0] : null;
        const key = typeof errorMessageObj == 'object' ? errorMessageObj.message : (typeof errorMessageObj == 'string' ? errorMessageObj : null);

        if (key) {
          const errorMessage = (`apiMessages.${key}`);
          if (errorMessage) message = errorMessage
          // this.toasterService.errorToast(message);
          message = key
        }
      }

    }
    return message;
  }
}
