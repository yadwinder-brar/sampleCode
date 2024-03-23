import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddquestionComponent } from '../addquestion/addquestion.component';
import { ApiService } from 'src/app/core/services';
import { FaqList } from 'src/app/share/models';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  panelOpenState = false;
  isLoading: boolean = false;
  search:string = '';
  faqList: FaqList[] = [];
  pageNo: any = 1;
  pageSize: any = 100;
  totalRecords: any;
  constructor(
    private dialog: MatDialog,
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
  AddQuestion(data: any): void {
    const dialogRef = this.dialog.open(AddquestionComponent, {
      width: '40%',
      height: '340px',
      panelClass: 'upload',
      data: { questionData: data }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getFaqList();
      }
    })


  }

  deleteFaq(id: string) {

    this.dialog
      .open(ConfirmationComponent, {
        maxWidth: '390px',
        minWidth: '390px',
        panelClass: 'dailogClass',
        data: {
          title: 'Delete Question',
          panelClass: 'dailogClass',
          description: 'Are you sure to delete this question?',
        },
      })
      .afterClosed().subscribe(res => {
        if (res) {
          this.isLoading = true;
          this._apiService.deleteFaq(id).subscribe(res => {
            if (res?.isSuccess) {
              this.isLoading = false;
              this.getFaqList();
            } else {
              this.isLoading = false;
            }
          })
        }
      })

  }



}