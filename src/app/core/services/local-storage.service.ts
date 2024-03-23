import { DefaultLanguageCode, LocalStorage, StorageKeys } from './../config/constants.config';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key: string, data: any) {
    localStorage.setItem(key, data);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
  get token() {
    return localStorage.getItem(LocalStorage.TOKEN) || '';
  }

  get user() {
    if (localStorage?.getItem(LocalStorage.USER)) {
      return JSON.parse(localStorage?.getItem(LocalStorage.USER) || '');
    } else {
      return '';
    }
  }
  storeActiveLanguage(language: string) {
    localStorage.setItem(StorageKeys.ActiveLanguageKey, language);
  }

}
