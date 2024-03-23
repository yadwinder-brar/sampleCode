import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services';
import { AuthService } from 'src/app/core/services/auth.service';
import { User_Role } from 'src/app/share/enums/userRoles';

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.css']
})
export class MyCardsComponent implements OnInit {
  userId: any;
  userRole: any;
  cardList: any = [];
  selectedCard: string = '';
  constructor(
    private _router: Router,
    private _apiService: ApiService,
    private _authService: AuthService,
  ) {
    this.userId = this._authService.getUserId();

    let userData = this._authService.getUserProfile();
   this.userRole = userData?.role
    // if (userRole?.code === User_Role.ADMIN) {
    //   this.next = '/admin/add-shipment/pakage-info';
    //   this.back = '/add-shipment/sender-address';
    // } else if (userRole?.code === User_Role.USER) {
    //   this. next = '/client/add-shipment/pakage-info';
    //   this.back = '/client/add-shipment/sender-address';
      
    // }
  }

  ngOnInit(): void {
    this.getCard();
  }
  getCard() {
    this._apiService.getCardList(this.userId).subscribe(res => {
      if (res.isSuccess) {
        this.cardList = res.items
      } else {

      }
    })
  }
  goToAddCard(){
    if (this.userRole?.code === User_Role.ADMIN) {
    this._router.navigate(["/admin/add-shipment/shipment/add-card"]);
  } else if (this.userRole?.code === User_Role.USER) {
    this._router.navigate(["/client/add-shipment/shipment/add-card"]);

  }
}

  pay() {
    if (this.selectedCard !== '') {
      // this._apiService.addCard(this.selectedCard).subscribe(res=>{
        if (this.userRole?.code === User_Role.ADMIN) {
          this._router.navigate(['/admin/add-shipment/shipment/pay-success']);
        } else if (this.userRole?.code === User_Role.USER) {
          this._router.navigate(['/client/add-shipment/shipment/pay-success']);
        }
      // ;
      // })
    } else {
      alert('Please Select Card')
    }
  }
  deleteCard(e: any, id: any) {
    if (this.userRole?.code === User_Role.ADMIN) {
      this._router.navigate(['/admin/add-shipment/shipment/delete-card/' + id]);
    } else if (this.userRole?.code === User_Role.USER) {
      this._router.navigate(['/client/add-shipment/shipment/delete-card/' + id]);
    }
    e.stopPropagation();
  }
}
