import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

export class ValidatorsService {
  constructor() {}

  static updateForm(
    group: FormGroup | FormControl | FormArray | AbstractControl,
    values: any
  ) {
    if (group instanceof FormControl) {
      group.setValue(values);
    } else if (group instanceof FormGroup) {
      Object.keys(group.controls).forEach((k) => {
        const control = group.get(k);
        if (values && values[k] !== undefined) {
          ValidatorsService.updateForm(control!, values[k]);
        }
      });
    } else if (group instanceof FormArray) {
      group.controls.forEach((c, index) => {
        if (values[index] !== undefined) {
          ValidatorsService.updateForm(c, values[index]);
        }
      });
    }
  }

  static error(errors: any, fieldName: string = 'Field') {
    if (!errors) return null;
    for (let propertyName in errors) {
      if (errors.hasOwnProperty(propertyName)) {
        return ValidatorsService.getValidatorErrorMessage(propertyName, {
          ...errors[propertyName],
          fieldName,
        });
      }
    }
    return null;
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config: any = {
      
      required: `Please enter ${
        validatorValue.fieldName ? `${validatorValue.fieldName}`.toLowerCase() : ''
      }`,
      verifyRequired: `Please  ${
        validatorValue.fieldName
          ? `${validatorValue.fieldName}`.toLowerCase()
          : ''
      }`,
      invalid: `Please enter valid ${
        validatorValue.fieldName
          ? `${validatorValue.fieldName}`.toLowerCase()
          : ''
      }`,
      selectRequired: `Please select  ${
        validatorValue.fieldName ? validatorValue.fieldName.toLowerCase() : ''
      } `,
      compare: "Password doesn't match",
      compareNot: "Old password  and new password shouldn't be same",
      compareSignature: "Signature should be same",
      min: `Minimum value required ${
        validatorValue.min ? validatorValue.min : ''
      }`,
      max: `Maximum value should be ${
        validatorValue.max ? validatorValue.max : ''
      }`,
      maxlength: `Maximum word limit reached`,
      maxZIpCode: `Please enter zip code less then 10 digits `,
      minZIpCode: `Please enter zip code minimum 5 digits `,
      maxAddresslength: `Address should be less then 35 characters in total address field  `,
      minlength: `Minimum ${
        validatorValue.requiredLength ? validatorValue.requiredLength : ''
      } characters are required`,
      // 'phonelength': 'Phone number should be between 7-10 digits',
      emailAlreadyExsist: 'Email address is already exsist.',
      invalidPercentage: `Please enter valid percentage.`,
      phonelength: 'Please enter valid phone number',
      minMobileNumber: 'Please enter valid contact number',
      minPassword: 'Minimum 6 characters are required',
      invalidName: 'Enter a valid name',
      invalidEmailAddress: 'Invalid email address',
      invalidPassword: 'A minimum 8 characters password contains a combination of letters, numbers and symbols.',
      invalidMinPassword: 'Password should be at least 6 characters long.',
      invalidNumber: 'Enter positive numeric values only',
      invalidPhoneNumber: 'Enter a valid phone number',
      invalidCardNumber: 'Please enter a valid credit/debit card number',
      invalidCVVNumber: 'Enter a valid CVV code',
      invalidCardExpiry: 'Invalid expiry date',
      invalidUrl: 'Enter a valid url starting with http://',
      invalidTaxId: 'Enter a valid TaxId',
      invalidFaxNumber: 'Enter a valid fax number',
      invalidZip: 'Please enter a valid zip code',
      invalidInput: 'Blank space is not allowed',
      timeOverLap: 'Time should not be overlaps.',
      timeNotInEventRange: `${
        validatorValue.fieldName ? validatorValue.fieldName : 'Time'
      } should be in event time range.`,
      endTimeBeforeStartTime: `${
        validatorValue.fieldName ? validatorValue.fieldName : 'End time'
      } should be greater than start time.`,
      invalidGoal: 'Please enter valid goal. ',
      invalidYouTube: 'Please enter a valid youtube url',
      invalidAccountNumber: 'Please enter a valid account number',
      invalidEmployeeId: 'Please enterzeroNotAllowed valid format',
      specialCharacter: 'Special character are not allowed',
      specialCharacterNot: 'Only alphabets are allowed',
      price: `Please enter valid ${
        validatorValue.fieldName ? validatorValue.fieldName.toLowerCase() : ''
      }.`,
      otpLength: 'Fill the complete OTP to verify',

      oneSpecialCharacter: `Password must contain at least one special character.`,
    };
    return config[validatorName];
  }

  static required(control: AbstractControl) {
    if (!control.value) {
      return { required: true };
    }
    return null;
  }

  static minMobileNumber(control: AbstractControl) {
    if (control?.value?.length < 7) {
      return { minMobileNumber: true };
    }
    return null;
  }
  static minPassword(control: AbstractControl) {
    if (control?.value?.length < 6  ) {
      return { minPassword: true };
    }
    return null;
  }
  static maxZip(control: AbstractControl) {
    if (control?.value?.length > 10  ) {
      return { maxZIpCode: true };
    }
    if (control?.value?.length < 5  ) {
      return { minZIpCode: true };
    }
    return null;
  }
  static maxAddress(control: AbstractControl) {
    if (control?.value?.length > 35  ) {
      return { maxAddresslength: true };
    }
    return null;
  }
  static verifyRequired(control: AbstractControl) {
    if (!control.value) {
      return { verifyRequired: true };
    }
    return null;
  }

  static selectRequired(control: AbstractControl) {
    if (!control.value) {
      return { selectRequired: true };
    }
    return null;
  }

  static compareValidator(control1: string, control2: string): ValidatorFn {
    return function matchPassword(c: AbstractControl) {
      if (
        c.get(control1)?.value &&
        c.get(control2)?.value &&
        c.get(control1)?.value !== c.get(control2)?.value
      ) {
        c.get(control2)?.setErrors({ compare: true });
        return { invalid: true };
      } else {
        return null;
      }
    };
  }
  static compareOldPassValidator(control1: string, control2: string): ValidatorFn {
    return function matchPassword(c: AbstractControl) {
      if (
        c.get(control1)?.value &&
        c.get(control2)?.value &&
        c.get(control1)?.value == c.get(control2)?.value
      ) {
        c.get(control2)?.setErrors({ compareNot: true });
        return { invalid: true };
      } else {
        return null;
      }
    };
  }
  static compareSignatureValidator(control1: string, control2: string): ValidatorFn {
    return function matchPassword(c: AbstractControl) {
      if (
        c.get(control1)?.value &&
        c.get(control2)?.value &&
        c.get(control1)?.value != c.get(control2)?.value
      ) {
        c.get(control2)?.setErrors({ compareSignature: true });
        return { invalid: true };
      } else {
        return null;
      }
    };
  }
  static spaceValidator(control: any) {
    if (control.value) {
      let v = `${control.value}`;
      if (v.replace(/\s+/g, '')) {
        return null;
      } else {
        return { invalidInput: true };
      }
    }
    return null;
  }

  static numberFieldRequiredValidator(control: any) {
    if (control.value) {
      return null;
    } else {
      return { required: true };
    }
  }

  static employeeId(control: any) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (`${control.value}`.match(/^(\w+)?\d+(\w+)?$/)) {
        return null;
      } else {
        return { invalidEmployeeId: true };
      }
    }
    return null;
  }

  static price(control: any) {
    const isValid = `${control.value}`.match(/[1-9]+(\0?\\.[0-9][0-9]?)?/);
    if (isValid?.length) {
      return null;
    } else {
      return { price: true };
    }
  }

  static specailCharacter(control: any) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (`${control.value}`.match(/^[0-9a-zA-Z ]+$/)) {
        return null;
      } else {
        return { specialCharacter: true };
      }
    }
    return null;
  }
  static specailCharacterNotAllowed(control: any) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (`${control.value}`.match(/^[a-zA-Z ]+$/)) {
        return null;
      } else {
        return { specialCharacterNot: true };
      }
    }
    return null;
  }

  static fullNameValidator(control: any) {
    // RFC 2822 compliant regex
    if (control.value) {
      let str = control.value.replace(/\s+/g, '');

      if (
        control.value.match(/^([a-z])+([a-zA-Z0-9 .,-@&#!\'\\$\\s]*)$/i) &&
        str.length > 0
      ) {
        return null;
      } else {
        return { invalidName: true };
      }
    }
    return null;
  }

  static OtpLength(control: AbstractControl) {
    if (control.value) {
      let str = control.value.replace(/\s+/g, '');
      if (str.length >= 4) {
        return null;
      } else {
        return { otpLength: true };
      }
    }
    return null;
  }
  // static creditCardExpiryDateValidator(control: any) {
  //   // let creditService = new CreditCardService();
  //   if (control.value) {
  //     let partsOfStr = control.value.split("/");
  //     if (creditService.validateCardExpiry(partsOfStr[0], partsOfStr[1])) {
  //       return null;
  //     } else {
  //       return { invalidCardExpiry: true };
  //     }
  //   }
  //   return null;
  // }
  static nameValidator(control: any) {
    // RFC 2822 compliant regex
    if (control.value) {
      let str = control.value.replace(/\s+/g, '');

      if (
        control.value.match(/^([a-z])+([a-zA-Z0-9 .,-@&#!\'\\$\\s]*)$/i) &&
        str.length > 0
      ) {
        return null;
      } else {
        return { invalidName: true };
      }
    }
    return null;
  }

  static emailValidator(control: any) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (
        control.value.match(
          /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|glass|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
        )
      ) {
        return null;
      } else {
        return { invalidEmailAddress: true };
      }
    }
    return null;
  }

  static numberValidator(control: any) {
    const value = `${control.value}`;
    if (value && value.match(/^[0-9]*$/)) {
      return null;
    } else {
      return { invalidNumber: true };
    }
  }

  static percentageValidator(control: any) {
    const value: string = `${control.value}`;
    if (value) {
      if (
        value.match(/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/g)
      ) {
        return null;
      } else {
        return { invalidPercentage: true };
      }
    }
    return null;
  }

  static phoneNumberValidator(control: any) {
    if (control.value) {
      if (control.value.match(/^\d{10}$/)) {
        return null;
      } else if (
        control.value.match(
          /^(\+\d{1,3}[- ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        )
      ) {
        return null;
      } else if (
        control.value.match(
          /^(\+\d{1,3}[- ]?)?\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        )
      ) {
        return null;
      } else {
        return { invalidPhoneNumber: true };
      }
    }
    return null;
  }

  static phoneNumberWithoutDialCodeValidator(control: any) {
    if (control.value) {
      var p = `${control.value}`.match(/\d+/);
      if (`${control.value}`.match(/^\d{7,15}$/)) {
        return null;
      } else if (p && p?.length < 7) {
        return { phonelength: true };
      } else {
        return { invalidPhoneNumber: true };
      }
    }
    return null;
  }

  static isLengthMet(control: any) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    const value = `${control.value}`;
    if (value) {
      if (value.match(/\s/g)) {
        return { invalidInput: true };
      }
      if (value.match(/.{6,}$/)) {
        return null;
      } else {
        return { invalidPassword: true };
      }
    }
    return null;
  }

  static passwordValidator(control: any) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    const value = `${control.value}`;
    if (value) {
      if (value.match(/\s/g)) {
        return { invalidInput: true };
      }
      if (value.match(('(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'))) {
        return null;
      } else {
        return { invalidPassword: true };
      }
    }
    return null;
  }



  static minPasswordValidator(control: any) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    const value = `${control.value}`;
    if (value) {
      if (value.match(/\s/g)) {
        return { invalidInput: true };
      }
      if (value.match(('(?=.*[a-z])(?=.{6,})'))) {
        return null;
      } else {
        return { invalidMinPassword: true };
      }
    }
    return null;
  }

  static urlValidator(control: any) {
    if (control.value) {
      if (
        control.value.match(
          /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/g
        )
      ) {
        return null;
      } else {
        return { invalidUrl: true };
      }
    }
    return null;
  }

  static isSpecialCharMet(control: any) {
    if (control.value) {
      if (control.value.match(/[!@#$%*<.,]/)) {
        return null;
      } else {
        return { oneSpecialCharacter: true };
      }
    }
    return null;
  }
}
