import { Component, Input, computed, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { lengthValidator, rangeValidator, typeValidator } from './payloadValidators';
import { MatInputModule } from '@angular/material/input';
import { NgxPortInfo } from '../types/rnbo-extensions/messaging';


@Component({
  selector: 'ngx-message-payload-input',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule],
  template: `
    <mat-form-field>
    <mat-label>Payload</mat-label>
    <input matInput [formControl]="ctl">
    @if(ctl.hasError('invalidType')) {
      <mat-error>Invalid payload type, must be {{typeErrorMessage()}}</mat-error>
    }
    @else if (ctl.hasError('invalidLength')) {
      <mat-error>Invalid payload length, must be between {{minElements()}} and {{maxElements()}}</mat-error>
    }
    @else if (ctl.hasError('invalidRange')) {
      <mat-error>Invalid payload value, must be between {{minValue()}} and {{maxValue()}}</mat-error>
    }
    @else {
      <mat-hint> {{hint()}} </mat-hint>
    }
    </mat-form-field>
  `,
  styles: ``
})
export class MessagePayloadComponent {
  
  port = input<NgxPortInfo|null>(null);
  hint = computed(() => this.port()?.meta?.hint??'');
  minElements = computed(() => this.port()?.meta?.minElements??0);
  maxElements = computed(() => this.port()?.meta?.maxElements??256);
  minValue = computed(() => this.port()?.meta?.minValue??Number.MIN_VALUE);
  maxValue = computed(() => this.port()?.meta?.maxValue??Number.MAX_VALUE);
  typeErrorMessage = computed(() => {
    if (this.port()?.meta?.intType && this.port()?.meta?.floatType) {
      return 'an integer or a float';
    } else if (this.port()?.meta?.intType) {
      return 'an integer';
    } else if (this.port()?.meta?.floatType) {
      return 'a float';
    } else {
      return 'empty';
    }
  });
  ctl = new FormControl<string|null>('', {
    validators: [
      typeValidator(this.port()?.meta?.intType??false, this.port()?.meta?.floatType??false),
      lengthValidator(this.port()?.meta?.minElements??0, this.port()?.meta?.maxElements??256),
      rangeValidator(this.port()?.meta?.minValue??Number.MIN_VALUE, this.port()?.meta?.maxValue??Number.MAX_VALUE)
    ]});
  @Input() set value(v: string|null) {
    this.ctl.setValue(v);
  }
  get value() {
    return this.ctl.value;
  }
}
