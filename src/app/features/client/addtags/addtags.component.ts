import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services';

@Component({
  selector: 'app-addtags',
  templateUrl: './addtags.component.html',
  styleUrls: ['./addtags.component.css']
})
export class AddtagsComponent implements OnInit {
  selectedTagsData: any = [];
  addressId: any;
  constructor(public dialogRef: MatDialogRef<AddtagsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _apiService: ApiService,
  ) {

    this.selectedTagsData = [...this.data?.tags]
    this.addressId = this.data?.id
  }

  ngOnInit(): void {
  }

  selectTags(data: any) {
    let index = this.selectedTagsData.indexOf(data);

    if (index > -1) {
      this.selectedTagsData.splice(index, 1);
      return
    }
    if (this.selectedTagsData && this.selectedTagsData.length > 1) {
      this.selectedTagsData.splice(0, 1);
      this.selectedTagsData.push(data);
    } else {
      this.selectedTagsData.push(data);
    }
  }
  addTags() {
    let data = {
      tags:this.selectedTagsData
    }
    this._apiService.addTags(data, this.addressId).subscribe(res => {
      if (res.isSuccess) {
        this.dialogRef.close(true);
      }
    })

  }
}
