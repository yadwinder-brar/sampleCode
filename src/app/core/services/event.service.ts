import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  clearAllFiledsObservable = new Subject<any>();
  clearAllFiledsObservable$ = this.clearAllFiledsObservable.asObservable();

  acknowledgeAlarmObservable = new Subject<boolean>();
  acknowledgeAlarmObservable$ = this.acknowledgeAlarmObservable.asObservable();

  spinnerObservable = new Subject<boolean>();
  spinnerObservable$ = this.spinnerObservable.asObservable();


  globalSearchObservable = new Subject<any>();
  globalSearchObservable$ = this.globalSearchObservable.asObservable();

  filterSearchObservable = new Subject<any>();
  filterSearchObservable$ = this.filterSearchObservable.asObservable();

  exportObservable = new Subject<boolean>();
  exportObservable$ = this.exportObservable.asObservable();

  socketDisconnectedObservable = new Subject<void>();
  socketDisconnectedObservable$ = this.socketDisconnectedObservable.asObservable();

  socketReConnectedObservable = new Subject<void>();
  socketReConnectedObservable$ = this.socketReConnectedObservable.asObservable();

  globalFilterChangedEvent = new Subject<string>();
  globalFilterChangedEvent$ = this.globalFilterChangedEvent.asObservable();

  globalSpanObservable = new Subject<any>();
  globalSpanObservable$ = this.globalSpanObservable.asObservable();

  homeHeaderFilterObservable = new Subject<any>();
  homeHeaderFilterObservable$ = this.homeHeaderFilterObservable.asObservable();

  homeFilterObservable = new Subject<any>();
  homeFilterObservable$ = this.homeFilterObservable.asObservable();

  loaderObservable = new Subject<boolean>();
  loaderObservable$ = this.loaderObservable.asObservable();

  formDataObservable = new Subject<void>();
  formDataObservable$ = this.formDataObservable.asObservable();

  constructor() { }


}
