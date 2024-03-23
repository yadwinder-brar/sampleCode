import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcountTypeService {

  accountType$: BehaviorSubject<any> = new BehaviorSubject('');
  formUrl$: BehaviorSubject<any> = new BehaviorSubject('');
  constructor() { }

  setAccountType(data: string) {
    this.accountType$.next(data);
  }
  setFormUrl(data: string) {
    this.formUrl$.next(data);
  }
}
