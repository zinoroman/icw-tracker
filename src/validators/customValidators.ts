import { ControlGroup } from "@angular/common";
import { ValidationResult } from '../interfaces/validation-result.interface';
 
export class CustomValidators {
    public static washingPricesRequired(group: ControlGroup): ValidationResult|Object {
        //Validator returns `true` if at least one of the prices is specified
        
        //By default result is not valid
        let validatorErrors: ValidationResult|Object = {
            washingPricesRequired: true
        };

        //Loop over group
        for (let formControlName in group.controls) {
            const currentFormControl = group.controls[formControlName];
            const currentFormControlValue: string = currentFormControl.value;

            //Ok. One of the prices is specified, so result is valid 
            if (currentFormControlValue && parseFloat(currentFormControl.value) > 0) {
                validatorErrors = null;
                break;
            }
        }

        return validatorErrors;
    }
}