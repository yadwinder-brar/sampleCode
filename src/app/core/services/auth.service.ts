import { ToasterService } from './toaster.service';
import { LocalStorageService } from './local-storage.service';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from '../config';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private ngZone: NgZone,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    if (token) return true;
    return false;
  }

  getAuthToken(): any {
    return localStorage.getItem(StorageKeys.AuthTokenKey);
  }

  storeAuthToken(token: string) {
    localStorage.setItem(StorageKeys.AuthTokenKey, token);
  }
  storeAdminToken(token: string) {
    localStorage.setItem('adminToken', token);
  }

  removeToken() {
    localStorage.removeItem(StorageKeys.AuthTokenKey);
  }

  storeRole(role: string) {
    localStorage.setItem(StorageKeys.UserRoleKey, role);
  }
  storeUserId(id: string) {
    localStorage.setItem(StorageKeys.UserId, id);
  }
  getUserId(): string {
    return localStorage?.getItem(StorageKeys.UserId) || '';
  }
  storePlanId(id: string) {
    localStorage.setItem(StorageKeys.PlanId, id);
  }
  removePlanId() {
    localStorage.removeItem(StorageKeys.PlanId);
  }
  getPlainId(): string {
    return localStorage?.getItem(StorageKeys.PlanId) || '';
  }
  storeUserProfile(data: any) {
    localStorage.setItem(StorageKeys.CurrentProfile, JSON.stringify(data));
  }
  storeAdminProfile(data: any) {
    localStorage.setItem(StorageKeys.AdminProfile, JSON.stringify(data));
  }
  storeApplicationFrom(data: any) {
    localStorage.setItem(StorageKeys.ApplicationFrom, JSON.stringify(data));
  }
  getApplicationFrom(): any {
    if (localStorage?.getItem(StorageKeys.ApplicationFrom)) {
      return JSON.parse(
        localStorage?.getItem(StorageKeys.ApplicationFrom) || ''
      );
    } else {
      return '';
    }
  }
  removeApplicationFrom() {
    localStorage.removeItem(StorageKeys.ApplicationFrom);
  }
  storeShipmentServices(data: any) {
    localStorage.setItem('shipmentServices', JSON.stringify(data));
  }
  getShipmentServices(): any {
    if (localStorage?.getItem('shipmentServices')) {
      return JSON.parse(localStorage?.getItem('shipmentServices') || '');
    } else {
      return '';
    }
  }
  getUserProfile(): any {
    if (localStorage?.getItem(StorageKeys.CurrentProfile)) {
      return JSON.parse(
        localStorage?.getItem(StorageKeys.CurrentProfile) || ''
      );
    } else {
      return '';
    }
  }
  getAdminProfile(): any {
    if (localStorage?.getItem(StorageKeys.AdminProfile)) {
      return JSON.parse(
        localStorage?.getItem(StorageKeys.AdminProfile) || ''
      );
    } else {
      return '';
    }
  }
  getUserAccountType(): string {
    return localStorage?.getItem(StorageKeys.UserAccountType) || '';
  }
  getAdditionalInfo(): any {
    if (localStorage?.getItem('additionalinfoForm')) {
      return JSON.parse(localStorage?.getItem('additionalinfoForm') || '');
    } else {
      return '';
    }
  }
  removeUserProfile() {
    localStorage.removeItem(StorageKeys.CurrentProfile);
  }

  logout() {
    this.clearStorage();
    this.ngZone.run(() => this.router.navigate(['/']));
  }

  // encrypt(value) {
  //   try {
  //     return Buffer.from(value).toString('base64');
  //   }
  //   catch (e) {
  //   }
  // }

  // decrypt(value) {
  //   return Buffer.from(value, 'base64').toString();
  // }

  storeTokens(token: string) {
    this.localStorageService.set(StorageKeys.AuthTokenKey, token);
  }

  clearStorage() {
    this.localStorageService.remove(StorageKeys.AuthTokenKey);
    this.localStorageService.remove(StorageKeys.UserRoleKey);
    this.localStorageService.remove(StorageKeys.ApplicationModeKey);
  }
}
