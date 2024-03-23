import { Directive, ElementRef, HostListener, NgModule } from "@angular/core";
import { NgControl } from '@angular/forms';
@Directive({
  selector: '[Separator]',
})
export class SeparatorDirective {

  constructor(private _inputEl: ElementRef,
    private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    if (this._inputEl.nativeElement.value === '-') return;
    let commasRemoved = this._inputEl.nativeElement.value.replace(/,/g, '');
    let toInt: number;
    let toLocale: string;
    if (commasRemoved.split('.').length > 1) {
      let decimal =isNaN(parseInt(commasRemoved.split('.')[1]))? '':parseInt(commasRemoved.split('.')[1]);
      toInt = parseInt(commasRemoved);
      toLocale = toInt.toLocaleString('en-US') + '.' + decimal;
    } else {
      toInt = parseInt(commasRemoved);
      toLocale = toInt.toLocaleString('en-US');
    }
    if (toLocale === 'NaN') {
      this._inputEl.nativeElement.value = '';
      this.ngControl.control?.setValue('');
    } else {
      this._inputEl.nativeElement.value = toLocale;
    }
  }
}


@NgModule({
    declarations: [SeparatorDirective],
    exports: [SeparatorDirective],
  })
  export class DecimalDirectiveModule {}
  