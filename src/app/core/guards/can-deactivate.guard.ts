import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';
import { User_Role } from 'src/app/share/enums/userRoles';


type CanDeactivateType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
export interface CanComponentDeactivate {
  canDeactivate: () => CanDeactivateType;
}
@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor(
    private _authService: AuthService,
    private _router:Router
  ){
  }
  canDeactivate(
    component: CanComponentDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): CanDeactivateType {
      const user = this._authService.getUserProfile();
if(!component.canDeactivate){
  if (user?.role?.code === User_Role.ADMIN) {
    this._router.navigate(['/admin/shipments']);
  } else if (user?.role?.code === User_Role.USER) {
    this._router.navigate(['/client/shipments']);

  }
}
      return component.canDeactivate ? component.canDeactivate() : true;
  }
  
}
