import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addnewcarrier',
  templateUrl: './addnewcarrier.component.html',
  styleUrls: ['./addnewcarrier.component.css']
})
export class AddnewcarrierComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddnewcarrierComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  )  { }

  ngOnInit(): void {
  }

}
