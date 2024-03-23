import { Injectable } from '@angular/core';

//cdk
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

//rxjs
import {  Subject } from 'rxjs'
import {  scan, map, distinctUntilChanged } from 'rxjs/operators'
import { MatSpinner } from '@angular/material/progress-spinner';
import { EventService } from './event.service';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private spinnerTopRef: OverlayRef;

  private spin$: Subject<number> = new Subject()
  noDataFound?: boolean;

  constructor(
    private overlay: Overlay,
    private eventService: EventService
  ) {

    this.spinnerTopRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });

    this.spin$
      .asObservable()
      .pipe(
        scan((acc, next) => {
          if(!next) return 0;
          return (acc + next) >= 0 ? acc + next : 0;
        }, 0),
        map(val => val > 0),
        distinctUntilChanged()
      )
      .subscribe(
        (res) => {
          if (res) {
    this.spinnerTopRef.attach(new ComponentPortal(MatSpinner))
          }
          else if (this.spinnerTopRef.hasAttached()) {
            this.spinnerTopRef.detach();
          }
        }
      )
  }
  showSpinner() {
    this.noDataFound = true
    this.spin$.next(1);
    this.eventService.loaderObservable.next(this.noDataFound);
  }
  hideSpinner() {
    this.spin$.next(-1);

    this.noDataFound = false
    this.eventService.loaderObservable.next(this.noDataFound);
    this.resetSpinner()
  }
  resetSpinner() {
    this.spin$.next(0);
  }
}





