import { Component, Input, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { payloadValidator } from './payloadValidator';

@Component({
  selector: 'ngx-message-payload-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <input type="text" [formControl]="payloadControl" />
  `,
  styles: ``
})
export class MessagePayloadInputComponent {
    
    payloadControl = new FormControl<string|null>('', {validators: [payloadValidator()]});
    @Input() set value(v: string|null) {
        this.payloadControl.setValue(v);
    }
    get value() {
        return this.payloadControl.value;
    }
    
  }
