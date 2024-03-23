// import { ToasterService } from './../services/toaster.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToasterService } from './../services/toaster.service';
import { Router } from '@angular/router';
@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
    constructor(
        private toasterService: ToasterService,
        private _router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => this.handleResponse(event))
        );
    }
    private handleResponse(event: HttpEvent<any>) {
        if (event instanceof HttpResponse) {
            const  message  = (event.body || '');
            if (message?.isSuccess) {
                if (message?.message) this.toasterService.successToast(message.message);
            }else{
                if (message) {
                    if(message?.code){
                        this.toasterService.errorToast(message?.message || message?.code)
                
                    }
                    else if(message?.message){
                        // if(message?.message== 'user not found'){
                        //     localStorage.clear();
                        //     this._router.navigate(['']);
                        // }
                        this.toasterService.errorToast(message?.message)
                    }

                    }
            }
        }

        return event;
    }
}
