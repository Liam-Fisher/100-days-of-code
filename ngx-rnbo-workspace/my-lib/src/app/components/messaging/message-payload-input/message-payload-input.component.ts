import { Component, EventEmitter, Input, Output, effect, input, model } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { payloadValidator } from './payloadValidator';

@Component({
  selector: 'ngx-message-payload-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <input type="text" [formControl]="control" />
  `,
  styles: ``
})
export class MessagePayloadInputComponent {
  displayMode = input<boolean>(false);
  
  @Input() set payload(v: number[]) {
    this.control.setValue(v.join(' '));
  }
  @Output() payloadChange = new EventEmitter<number[]>();

  control = new FormControl<string>("" , {validators: payloadValidator()});
  $control = this.control.valueChanges.subscribe((v) => {
    let value = v;
    console.log(`payload input value ${value}`);
    let payload = value?.split(' ').map(el=>+el).filter(el => !isNaN(el));
    console.log(`payload input payload ${payload}`);
    this.payloadChange.emit(payload??[]);
  });
  }
