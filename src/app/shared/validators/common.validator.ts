import { AbstractControl, ValidatorFn } from "@angular/forms";

export function nameValidator(regx: RegExp): ValidatorFn {

  return (control: AbstractControl): {[key: string]: boolean} | null => {

    // Without regx

    if (control.value.trim() == "manish") {

      return {'nameNotAllowed': true};

    }

    // With regx

    const notAllowed = regx.test(control.value);

    return notAllowed ? {'nameNotAllowed': true} : null;

  }

}