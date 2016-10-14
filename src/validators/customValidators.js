"use strict";
var CustomValidators = (function () {
    function CustomValidators() {
    }
    CustomValidators.washingPricesRequired = function (group) {
        //Validator returns `true` if at least one of the prices is specified
        //By default result is not valid
        var validatorErrors = {
            washingPricesRequired: true
        };
        //Loop over group
        for (var formControlName in group.controls) {
            var currentFormControl = group.controls[formControlName];
            var currentFormControlValue = currentFormControl.value;
            //Ok. One of the prices is specified, so result is valid 
            if (currentFormControlValue && parseFloat(currentFormControl.value) > 0) {
                validatorErrors = null;
                break;
            }
        }
        return validatorErrors;
    };
    return CustomValidators;
}());
exports.CustomValidators = CustomValidators;
