import { Component, Input, effect, input, model } from '@angular/core';
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
  
  value = model<number[]>([]);
  control = new FormControl<string>("" , {validators: payloadValidator()});
  setEffect = effect(() => this.control.setValue(this.value().join(' ')));
  
  getSubscription = this.control.valueChanges.subscribe((v) => {
    this.value.set(v?.split(' ').map(el=>+el).filter(el => isNaN(el))??[])
  });

    
  }
