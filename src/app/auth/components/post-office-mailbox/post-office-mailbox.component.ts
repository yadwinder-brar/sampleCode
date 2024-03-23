import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/core/services';
import { AcountTypeService } from '../../services/acount-type.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-office-mailbox',
  templateUrl: './post-office-mailbox.component.html',
  styleUrls: ['./post-office-mailbox.component.css']
})
export class PostOfficeMailboxComponent implements OnInit {
  url: any;
  formData: any;
  form!: FormGroup;
  minDate:any = new Date();
  constructor(private router: Router,private _acount : AcountTypeService,
    private _toastServices:ToasterService,
    private _fb: FormBuilder,
    private datePipe: DatePipe,
    ) { 
      this.minDate = this.datePipe.transform(this.minDate, 'MM-dd-YYYY');
    }
  fileName!:string;
  ngOnInit(): void {
    let data:any = localStorage.getItem('postOfficeFormValues');
    this.formData = data?JSON.parse(data):''
    this.createForm();
  }
  createForm(){
    this.form = this._fb.group({
      contractDate: [this.minDate, [ValidatorsService.required]],
      name: [this.formData?this.formData?.name:'', [ValidatorsService.required,]],
      signature: [this.formData?this.formData?.signature:'', [ValidatorsService.required,]],
      initial:[this.formData?this.formData?.initial:'',ValidatorsService.required,],
      mailboxType:[this.formData?this.formData?.mailboxType:'personal',ValidatorsService.required,],
    })
  }
next(){
  if(this.form.valid){
    // this._acount.setFormUrl(this.url);
      localStorage.setItem('postOfficeFormValues', JSON.stringify(this.form.value))
    this.router.navigate(['/post-mail-box2']);
  }else{
    this.form.markAllAsTouched();
    // alert('please enter your details');
  }
}
// selectFile(event:any){
//   this.fileName = event[0]
//   this.url = event[0];
// }
error(control: any, name: any) {
  return ValidatorsService.error(control?.errors, name);
}
}
