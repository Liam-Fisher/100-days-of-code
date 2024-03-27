import { Component, effect, inject, model } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RnboBufferService } from '../../../services/buffers/rnbo-buffer-service.service';

function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    try {
      let url = new URL(control.value);
    }
    catch(e) {
      console.log(e);
      return {invalidUrl: {value: control.value}};
    }
    return null;
  };
}



@Component({
  selector: 'ngx-buffer-url-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input type="text" placeholder="Enter a URL" [formControl]="control" />
  `,
  styles: ``
})
export class BufferUrlInputComponent {
  url = model<string>('');
  $url = effect(() => this.control.setValue(this.url(), {emitEvent: false}));
  control = new FormControl<string|null>('', {updateOn: 'blur', validators: [urlValidator()]});
  $control = this.control.valueChanges
  .subscribe((v) => v&&this.control.valid?this.url.set(v):this.url.set(''));
    constructor() { }
}
