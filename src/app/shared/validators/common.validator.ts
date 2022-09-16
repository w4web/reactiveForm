import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

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

export function MatchValidator(source: string, target: string) {

  return (formGroup: FormGroup) => {

    const sourceCtrl = formGroup.controls[source];
    const targetCtrl = formGroup.controls[target];

    if (targetCtrl.errors && !targetCtrl.errors['mismatch']) {

        return;

    }

    if (sourceCtrl.value !== targetCtrl.value) {

        targetCtrl.setErrors({ mismatch: true });

    } else {

        targetCtrl.setErrors(null);
        
    }

  }

}