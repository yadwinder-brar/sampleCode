import { AuthService } from 'src/app/core/services';
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { User_Role } from 'src/app/share/enums/userRoles';


@Injectable({ providedIn: 'root' })
export class UnauthGuard implements CanActivate {
  constructor(private router: Router, private _authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = this._authService.isAuthenticated();;
    const user = this._authService.getUserProfile();
    if (!isLoggedIn) return true;
    if (isLoggedIn && user.role.code === User_Role.ADMIN) {
      this.router.navigate(['/admin'])
      return false;
    }
    if (isLoggedIn && user.role.code === User_Role.USER) {
      this.router.navigate(['/client'])
      return false;
    }
    if (isLoggedIn && user.role.code === User_Role.SUB_ADMIN) {
      this.router.navigate(['/subAdmin'])
      return false;
    }

    return false;
  }
}
