import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  faqForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddquestionComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private _apiService:ApiService,
    private _fb:FormBuilder

  ) { 

    this.dialogData?.questionData;
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.faqForm = this._fb.group({
      question: [this.dialogData?.questionData?.question?this.dialogData?.questionData?.question:'', [ValidatorsService.required]],
      answer: [this.dialogData?.questionData?.answer?this.dialogData?.questionData?.answer:'', [ValidatorsService.required]]
    })
  }
  addEditQuestion(){
    if(this.faqForm?.invalid){
      this.faqForm.markAllAsTouched();
      return
    }
    if(this.faqForm.valid){
      this.dialogData?.questionData?.id? this.updateQuestion():this.addQuestion()
    }
  }
  // 

  updateQuestion(){
    let id = this.dialogData?.questionData?.id
    this._apiService.updateFaq(this.faqForm.value,id).subscribe(res => {
      if (res?.isSuccess) {
        this.dialogRef.close(true)
      } else {
      }
    })

  }
  addQuestion(){
    let data = this.faqForm.value
    this._apiService.addFaq(data).subscribe(res => {
      if (res?.isSuccess) {
        this.dialogRef.close(true)
      } else {
      }
    })

  }
}
