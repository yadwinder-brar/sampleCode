import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationdialogComponent } from '../notificationdialog/notificationdialog.component';
import { Router } from '@angular/router';
import { LoginService, AuthService, ApiService } from 'src/app/core/services';
import { Notifications } from 'src/app/share/models/notifications.model';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  @Input() pageName? = ''
  @Input() link: any;
  @Input() icon: boolean = false;
  notificationList:Notifications[] = [];
  userId:any;
  userData:any;
  constructor(private dialog:MatDialog,
    private _loginService: LoginService,
    private _authService: AuthService,
    private _apiServices: ApiService,
    private _router:Router
    ) {
      this.userData = this._authService.getUserProfile();
      this.userId = this.userData?.id
    }
  
  notificationdialog() {
    this.dialog
      .open(NotificationdialogComponent, {
        // maxWidth: '390px',
        minWidth: '320px',
        minHeight: '400px',
        // maxHeight: '310px',
        panelClass: 'dailogClass',
        data:{notificationData:this.notificationList}
      })
      .afterClosed();
    }
   
  ngOnInit(): void {
    this.getNotifications();
  }
  logout(){
    localStorage.clear();
    this._loginService.logout(this.userId).subscribe(res=>{
      if(res.isSuccess){
      }
    })
    this._router.navigate(['/home']);
  }


  getNotifications(){
this._apiServices.getNotifications().subscribe(res=>{
  if(res?.isSuccess){
    this.notificationList= res?.items
  }
})
  }
}
