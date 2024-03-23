import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService, AuthService, LoginService } from 'src/app/core/services';
import { NotificationdialogComponent } from '../../admin/notificationdialog/notificationdialog.component';
import { Notifications } from 'src/app/share/models';

@Component({
  selector: 'app-sub-admin-header',
  templateUrl: './sub-admin-header.component.html',
  styleUrls: ['./sub-admin-header.component.css'],
})
export class SubAdminHeaderComponent implements OnInit {
  @Input() pageName? = '';
  @Input() link: any;
  @Input() icon: boolean = false;
  notificationList: Notifications[] = [];
  userId: any;
  userData: any;

  constructor(
    private dialog: MatDialog,
    private _loginService: LoginService,
    private _authService: AuthService,
    private _apiServices: ApiService,
    private _router: Router
  ) {
    this.userData = this._authService.getUserProfile();
    this.userId = this.userData?.id;
  }

  ngOnInit(): void {
    this.getNotifications();
  }

  notificationdialog() {
    this.dialog
      .open(NotificationdialogComponent, {
        // maxWidth: '390px',
        minWidth: '320px',
        minHeight: '400px',
        // maxHeight: '310px',
        panelClass: 'dailogClass',
        data: { notificationData: this.notificationList },
      })
      .afterClosed();
  }

  getNotifications() {
    this._apiServices.getNotifications().subscribe((res) => {
      if (res?.isSuccess) {
        this.notificationList = res?.items;
      }
    });
  }

  logout() {
    localStorage.clear();
    this._loginService.logout(this.userId).subscribe((res) => {
      if (res.isSuccess) {
      }
    });
    this._router.navigate(['/home']);
  }
}
