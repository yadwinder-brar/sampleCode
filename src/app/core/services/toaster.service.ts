import { Injectable } from '@angular/core';
import { ToastConfig, Toaster } from 'ngx-toast-notifications';

enum ToasterType {
    Success = 'success',
    Error = 'danger',
    Warning = 'warning'
};

@Injectable({
    providedIn: 'root'
})
export class ToasterService {
    constructor(
        private toaster: Toaster
    ) { }

    successToast(text: string, closeable: boolean = true, duration: number = 3000) {
        this.showToast(text,closeable, ToasterType.Success, duration);
    }

    warningToast(text: string, closeable: boolean = true, duration: number = 3000) {
        this.showToast(text,closeable, ToasterType.Warning, duration);
    }

    errorToast(text: string, closeable: boolean = true, duration: number = 3000) {
        this.showToast(text, closeable, ToasterType.Error, duration);
    }

    private showToast(text: string,  closeable: boolean, type: ToasterType, duration: number) {
        const message =  text;


        let toasterProperties: ToastConfig = {
            text: message,
            duration: duration,
            type: type,
        };



        this.toaster.open(toasterProperties);
    }
}
