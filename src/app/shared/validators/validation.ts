import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {

  static match(source: string, target: string): ValidatorFn {

    return (controls: AbstractControl) => {

      const sourceCtrl = controls.get(source);
      const targetCtrl = controls.get(target);

      if (targetCtrl?.errors && !targetCtrl.errors['mismatch']) {
        return null;
      }

      if (sourceCtrl?.value !== targetCtrl?.value) {
        controls.get(target)?.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        return null;
      }
      
    };

  }

}
