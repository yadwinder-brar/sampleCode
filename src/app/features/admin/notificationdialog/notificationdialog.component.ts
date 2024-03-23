import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notifications } from 'src/app/share/models/notifications.model';

@Component({
  selector: 'app-notificationdialog',
  templateUrl: './notificationdialog.component.html',
  styleUrls: ['./notificationdialog.component.css']
})
export class NotificationdialogComponent implements OnInit {
notifications:Notifications[]= [];
  constructor(
    public dialogRef:MatDialogRef<NotificationdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) { 

    this.notifications = this.dialogData?.notificationData
  }

  ngOnInit(): void {
  }

}
