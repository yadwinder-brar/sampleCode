import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, ToasterService } from 'src/app/core/services';
import { ApiService } from 'src/app/core/services/api.service';
import { User_Role } from 'src/app/share/enums/userRoles';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.css']
})
export class DeleteCardComponent implements OnInit {
  cardId: string = '';
  userRole:any;
  constructor(
    private _apiService: ApiService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _toasterService: ToasterService,

  ) {
    this.cardId = this._route.snapshot.params["id"];
    let userData = this._authService.getUserProfile();
    this.userRole = userData?.role
  }

  ngOnInit(): void {
  }
  deleteCard() {
    this._apiService.deleteCard(this.cardId).subscribe(res => {
      if (res.isSuccess) {
        if (this.userRole?.code === User_Role.ADMIN) {
          this._router.navigate(['/admin/add-shipment/shipment/my-cards'])
        } else if (this.userRole?.code === User_Role.USER) {
          this._router.navigate(['/client/add-shipment/shipment/my-cards'])

        }
      } else {
        this._toasterService.errorToast(res?.message)
      }
    })
  }
}
