
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-invoice-pay',
  templateUrl: './invoice-pay.component.html',
  styleUrls: ['./invoice-pay.component.css']
})
export class InvoicePayComponent implements OnInit {
    constructor(
      public dialogRef:MatDialogRef<InvoicePayComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
    }
    ngOnInit() {
    }
  
  }
  