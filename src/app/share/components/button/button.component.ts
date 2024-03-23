import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() name :string ="";
  @Input() disable :boolean = true;
  @Input() type! :string;
  @Input() color? :string= 'primary' ;
  @Input() buttonClass? :string= '' ;
  @Output() onClick = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  buttonClicked(){
    this.onClick.emit();
  }
}
