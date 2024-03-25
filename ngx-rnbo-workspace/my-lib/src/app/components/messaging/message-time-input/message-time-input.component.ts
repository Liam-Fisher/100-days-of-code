import { Component, Input, computed, effect, input, model } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-message-time-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input type="number" [formControl]="timeInputControl" />
  `,
  styles: ``
})
export class MessageTimeInputComponent {
  // make these a directive?
  value = model<number>(0);
  timeInputControl = new FormControl<string|null>('0');
  setEffect = effect(() => {
    this.timeInputControl.setValue(this.value().toString());
  });
  getSubscription = this.timeInputControl.valueChanges.subscribe((v) => {
    this.value.set(!(v===null||isNaN(+v))?+v as number:0)
  });
}
