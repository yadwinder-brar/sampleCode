import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
updatePasswordForm!:FormGroup;
conPassword:boolean= false;
newPassword:boolean= false;
oldPassword:boolean= false;
userId:any;
  constructor(
    private _fb:FormBuilder, 
    private _apiService:ApiService,
    private _route: ActivatedRoute,
    private _router:Router,
    ) { 

    this.userId = this._route.snapshot.params["id"]
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
//  { validators: [ValidatorsService.compareValidator('newPassword', 'confirmPassword')]})
    this.updatePasswordForm = this._fb.group({
      oldPassword:['',ValidatorsService.required],
      newPassword:['',[ValidatorsService.required,ValidatorsService.minPassword]],
      confirmPassword:['',[ValidatorsService.required,ValidatorsService.minPassword]],
    },
    { validators: [ValidatorsService.compareOldPassValidator('oldPassword', 'newPassword'),ValidatorsService.compareValidator('newPassword', 'confirmPassword')]})
  }
  submit(){
    if (this.updatePasswordForm.invalid) {
      this.updatePasswordForm.markAllAsTouched();
      return
    }
    // this.updatePasswordForm.reset();
    if (this.updatePasswordForm.valid) {
      let data = {
        password:this.updatePasswordForm.value.oldPassword,
        newPassword:this.updatePasswordForm.value.newPassword,
      }
    this._apiService.UpdatePassword(data,this.userId).subscribe(res=>{
      if(res.isSuccess){
        this._router.navigate(['/client/dashboard']);
      }
    })
    }


  }
}
