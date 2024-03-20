import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
const numberRe = /^(?:\d+\.?\d*\s*)*$/;
const intRe = /^(?:\d+\s*)*$/;
const floatRe = /^(?:\d+\.\d+\s*)*$/;
const emptyRe = /^\s*$/;
export function typeValidator(intsForbidden: boolean, floatsForbidden: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if(intsForbidden && floatsForbidden) {
        return emptyRe.test(control.value) ? null : {invalidType: {value: control.value}};
    }
    if(intsForbidden) {
        return intRe.test(control.value) ? null : {invalidType: {value: control.value}};
    }
    if(floatsForbidden) {
        return floatRe.test(control.value) ? null : {invalidType: {value: control.value}};
    }
    return numberRe.test(control.value) ? null : {invalidType: {value: control.value}};
  };
}
export function rangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = control.value < min || control.value > max;
    return forbidden ? { invalidRange: { value: control.value } } : null;
  };
}
export function lengthValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const length = control.value.split(' ').filter((x: string) => x.length > 0).length;
    const forbidden = control.value.length < min || control.value.length > max;
    return forbidden ? { invalidLength: { value: control.value } } : null;
  };
}
