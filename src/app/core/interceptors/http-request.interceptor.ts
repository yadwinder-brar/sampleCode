import { AuthService } from './../services/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorage } from '../config';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isBackgroudCall = request.headers.has('isBackgroudCall') || false;

    if (request.method == "POST" && !isBackgroudCall) {
      request = request.clone({
        setHeaders: {
          "Content-Type": "application/json"
        }
      });
    }

    // Add authorization header with jwt token
    const isLoggedIn = this.authService.isAuthenticated();

    if (isLoggedIn) {

      const token = this.authService.getAuthToken();
      request = request.clone({
        setHeaders: {
          // Authorization: `Bearer ${token}`
          [LocalStorage.TOKEN] : token 
        }
      })
    }
    return next.handle(request)
  }
}
