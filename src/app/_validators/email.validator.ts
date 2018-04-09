/*
 * Determine if given email already exists in asp membership tables.
 * 
 */


import { AbstractControl } from '@angular/forms';
import { SignupService } from '../_services/signup.service';

export class ValidateEmailNotTaken {

  static createValidator(signupService: SignupService) {
    
    return (control: AbstractControl) => {
      return signupService.checkEmailNotTaken(control.value)
      .map(res => {
        return !res ? null : { emailTaken: true };
      });
    };
  }
}