import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";



@Injectable({
  providedIn: 'root'
 })
 export class StepTourService {
    public toggleCart = new BehaviorSubject<any>('');
    // public tour = new BehaviorSubject<boolean>(false);
    public tourSubject = new BehaviorSubject<boolean>(false);
    tour = this.tourSubject.asObservable();
  public showShipmentTour = new BehaviorSubject<boolean>(false);

startShipmentTour(){
  this.showShipmentTour.next(true);
}
    startTour() {
      // this.tourSubject.next(true);
    }
  constructor(private http: HttpClient) { }


}
