/*
 * Is a given county found in flex?
 * Need to verify to load tax rates for a dealer.
 * 
 */

import { AbstractControl } from '@angular/forms';
import { SignupService } from '../_services/signup.service';

export class ValidateCountyExists {

  static createValidator(signupService: SignupService) {
    
    return (control: AbstractControl) => {
      return signupService.getCounty(control.value)
      .map(res => {
        return res ? null : { countyExists: false };
      });
    };
  }
}