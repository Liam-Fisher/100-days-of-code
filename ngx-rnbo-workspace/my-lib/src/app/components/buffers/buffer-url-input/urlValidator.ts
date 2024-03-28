import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// write more of these? Like for data defineed in the meta


export function urlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        try {
            let url = new URL(control.value);
        }
        catch(e) {
            return {invalidType: {value: control.value}};
        }
        return null;
    };
}
