import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService, ToasterService } from 'src/app/core/services';
import { RequestChangeDialogComponent } from '../request-change-dialog/request-change-dialog.component';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  isLoading: boolean = false;
  ShowOption: boolean = false;
  optionIndex:number = 0;
  trashedDate = '';
  trashedType = '';
  maxDate = new Date();
  totalRecords: any;
  search: string = '';
  pageNo: number = 1;
  pageSize: number = 10;
  trashedList: any = [];
  constructor(private _apiServices: ApiService,
    public sanitizer: DomSanitizer,
    private _toasterService: ToasterService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getTrashList();
  }
  getTrashList() {
    let data = {
      search: this.search,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      date: this.trashedDate,
      status: 'inTrash'
    }
    this.isLoading = true;
    this._apiServices.getMailTrashList(data).subscribe(res => {

      if (res?.isSuccess) {
        this.trashedList = res?.items;
        this.totalRecords = res?.totalRecords
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    })
  }

  viewImg(data:any){
    window.open(data?.labelLink, "_blank")
  }
  getImageName(img:string):any{
    // let img = "html/data/img.pdf"
    let data = img.split(".");
    let type = data[data.length-1]
    return type;
    }

  makeRequestChange(data:any){
    this.dialog.open(RequestChangeDialogComponent,{
      maxWidth: '85%',
      minWidth: '85%',
      panelClass: 'dailogClass',
      data: {data:data , type:'trash'},
    })
    .afterClosed().subscribe(res => {
      if (res) { 
        this.getTrashList();
      }
    })
  }

}
