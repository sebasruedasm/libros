import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxTwoDecimalPlacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && !/^(\d+(\.\d{1,2})?)$/.test(control.value)) {
      console.log(["MASSSSSSSSSSSS"])
      return { maxTwoDecimalPlaces: true };
    }
    return null;
  };
}
