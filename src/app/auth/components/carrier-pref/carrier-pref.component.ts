import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrier-pref',
  templateUrl: './carrier-pref.component.html',
  styleUrls: ['./carrier-pref.component.css']
})
export class CarrierPrefComponent implements OnInit {
 isLoading:boolean= false
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  skip(){
    this.router.navigate(['/mailbox'])
      }
  next(){
    // FixMe  need api for carrier prefrences;
    this.isLoading= true;
    this.router.navigate(['/mailbox'])
      }

}
