import { Component, OnInit,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-bank-detail-update',
  templateUrl: './bank-detail-update.component.html',
  styleUrls: ['./bank-detail-update.component.css']
})
export class BankDetailUpdateComponent implements OnInit {

  constructor( public dialogRef:MatDialogRef<BankDetailUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
  }

}
