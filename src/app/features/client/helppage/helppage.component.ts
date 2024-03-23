import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { FaqList } from 'src/app/share/models';

@Component({
  selector: 'app-helppage',
  templateUrl: './helppage.component.html',
  styleUrls: ['./helppage.component.css']
})
export class HelppageComponent implements OnInit {
  panelOpenState = false;
  isLoading: boolean = false;
  search:string = '';
  faqList: FaqList[] = [];
  pageNo: any = 1;
  pageSize: any = 100;
  totalRecords: any;
  constructor(
    private _apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getFaqList();
  }
  searchFaq(){
    this.getFaqList();
  }

  getFaqList() {
    this.isLoading = true;
    let data = {
      search :this.search,
      pageNo:this.pageNo,
      pageSize:this.pageSize
    }
    this._apiService.getFaqList(data).subscribe(res => {
      if (res?.isSuccess) {
        this.faqList = res?.items;
        this.totalRecords = res?.totalRecords
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    })
  }


}
