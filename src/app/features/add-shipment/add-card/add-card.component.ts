import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService, AuthService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { User_Role } from 'src/app/share/enums/userRoles';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  addCardForm!: FormGroup;
  addCardSub!: Subscription;
  userId: any;
  userRole: any;
  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _authService: AuthService,
    private _router: Router,
  ) {
    let userData = this._authService.getUserProfile();
    this.userRole = userData?.role
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.addCardForm = this._fb.group({
      name: ['', [ValidatorsService.required, ValidatorsService.nameValidator]],
      cardNumber: ['', [ValidatorsService.required, ValidatorsService.minPassword]],
      expiryDate: ['', ValidatorsService.required],
      cvv: ['', ValidatorsService.required]
    })
  }
  get getCardNumber() {
    return (
      `${this.addCardForm.controls['cardNumber'].value}`
        .match(/\d{1,4}/g)
        ?.slice(0, 4)
        ?.join("-") || ""
    );
  }
  monthYearChange({ value }: any) {
    const [month, year] = `${value}`.match(/\d{1,2}/g) || [];
    if (!month || !year) return;
    // this.addCardForm.controls.expMonth.setValue(month || "");
    // this.addCardForm.controls.expYear.setValue(year || "");
  }
  get monthYear() {
    return (
      `${this.addCardForm.controls['expiryDate'].value}`
        .match(/\d{1,2}/g)
        ?.slice(0, 3)
        ?.join("/") || ""
    );
  }
  submit() {
    if (this.addCardForm.invalid) {
      this.addCardForm.markAllAsTouched();
      return;
    }
    if (this.addCardForm.valid) {
      let data = this.parseDate(this.addCardForm?.controls['expiryDate']?.value)
      let newData = this.getDiff(this.addCardForm?.controls['expiryDate']?.value);

      this.addCardSub = this._apiService.addCard(this.addCardForm.value).subscribe((res: any) => {

        if (res?.isSuccess) {
          if (this.userRole?.code === User_Role.ADMIN) {
            this._router.navigate(['/admin/add-shipment/shipment/my-cards'])
          } else if (this.userRole?.code === User_Role.USER) {
            this._router.navigate(['/client/add-shipment/shipment/my-cards'])

          }
          
        }
      })
    }
  }
  parseDate(e: any) {
    if (e.length == 3) { e = '0' + e; }
    return new Date(`${e.substring(0, 2)}/1/${e.slice(-2)}`);
  };
  getDiff = (e: any) => {
    let curr = new Date();
    let dt = this.parseDate(e);
    return (dt.getMonth() - curr.getMonth()) > 3;
  }

}
