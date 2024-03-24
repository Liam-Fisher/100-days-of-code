import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// write more of these? Like for data defineed in the meta
const numberRe = /^(?:\d+\.?\d*\s*)*$/;

export function payloadValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
    return numberRe.test(control.value) ? null : {invalidType: {value: control.value}};
    };
}
