import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-clickview',
  templateUrl: './clickview.component.html',
  styleUrls: ['./clickview.component.css']
})
export class ClickviewComponent implements OnInit {
  images:any = [];
  constructor( 
    public dialogRef: MatDialogRef<ClickviewComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData:any) {

      this.images = this.dialogData?.images?.scanImages;
  }

  ngOnInit(): void {
  }
  viewImg(data:any){
window.open(data,"_blank")
  }
  getImageName(img:string):any{
    // let img = "html/data/img.pdf"
    let data = img.split(".");
    let type = data[data.length-1]
    return type;
    }


}
