import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { TutorialVideosComponent } from './tutorial-videos/tutorial-videos.component';
import { TourService } from 'ngx-tour-md-menu';
import { StepTourService } from 'src/app/core/services/tour.service';
@Component({
  selector: 'app-client-dashboard-header',
  templateUrl: './client-dashboard-header.component.html',
  styleUrls: ['./client-dashboard-header.component.css'],
})
export class ClientDashboardHeaderComponent implements OnInit {
  @Input() pageName? = 'Dashboard';
  @Input() link: any;
  @Input() icon: boolean = false;
  userId: any;
  userData: any;
  isSmallNav: boolean = true;
  userAccountType: any
  constructor(
    private _loginService: LoginService,
    private tourService: TourService,
    private _authService: AuthService,
    private _router: Router,
    private dialog: MatDialog,
    private stepTourService: StepTourService
  ) {
    this.userData = this._authService.getUserProfile();
    this.userId = this._authService.getUserId();
    this.userAccountType = this._authService.getUserAccountType();
    // this.startTour();
  }

  ngOnInit(): void {
  }

  // startTour() {
  //   this.stepTourService.toggleCart.next('stepTour');
  // }

  toggleSmallNav() {
    if (!this.isSmallNav1) {
      localStorage.setItem('isSmall', 'true');
    } else {
      localStorage.removeItem('isSmall');
    }
  }

  get isSmallNav1() {
    return localStorage.getItem('isSmall');
  }
  logout() {
    localStorage.clear();
    this._router.navigate(['/home']);
    this._loginService.logout(this.userId).subscribe((res) => {
      if (res.isSuccess) {
      }
    });
  }

  openTutorial() {
    this.dialog.open(TutorialVideosComponent, {
      width: '750px',
      maxHeight: 'auto',
      disableClose: true,
    });
  }
}
