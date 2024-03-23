import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcountTypeService } from '../../services/acount-type.service';

@Component({
  selector: 'app-mailbox-application',
  templateUrl: './mailbox-application.component.html',
  styleUrls: ['./mailbox-application.component.css']
})
export class MailboxApplicationComponent implements OnInit {
  accountType :string =''
  constructor(private router: Router,
  ) {
    this.accountType = localStorage.getItem('accountType') || ''
   }

  ngOnInit(): void {
    
}

next(){
  this.router.navigate(['/login'])
}

}
