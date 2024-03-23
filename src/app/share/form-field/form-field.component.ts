import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { ValidatorsService } from "src/app/core/services/validation.service";
// import { ValidatorsService } from "@core/services/validation.service";

@Component({
  selector: "form-field",
  templateUrl: "./form-field.component.html",
  styleUrls: ["./form-field.component.scss"],
})
export class FormFieldComponent implements OnInit {
  @Input("errorControl") control: AbstractControl | null = null;
  @Input("name") name?: string;

  constructor() { }

  ngOnInit() { }


  get error() {
    return ValidatorsService.error(this.control?.errors, this.name);
  }
}
