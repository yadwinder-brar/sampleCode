import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-getcode',
  templateUrl: './getcode.component.html',
  styleUrls: ['./getcode.component.css']
})
export class GetcodeComponent implements OnInit {
  inputConfig = {
    length: 5,
    allowNumbersOnly: true,
    inputStyles: {
      borderRadius: ` 18px`,
      outline: 'none',
      textAlign: 'center',
      width: ' 50px',
      height: ' 50px',
      color: '#474849',
      border: ' 2px solid #8888881A',
      backgroundColor: '#fff',
      fontSize: '20px',
      fontWeight: '600',    
      marginRight: '10x',
    },
  };
  constructor() { }

  ngOnInit(): void {
  }

  onOtpChange(e:any){

  }
}
