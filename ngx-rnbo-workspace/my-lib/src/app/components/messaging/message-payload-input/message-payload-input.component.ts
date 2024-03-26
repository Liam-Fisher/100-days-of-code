import { Component, EventEmitter, Input, Output, effect, input, model } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { payloadValidator } from './payloadValidator';
import { NgxPortInfo } from '../../../types/messaging';

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
  $displayMode = effect(() => this.displayMode() ? this.control.disable() : this.control.enable());
  
  port = input.required<NgxPortInfo|null>();

  payload = model<number[]>([]);
  $payload = effect(() => this.control.setValue(this.payload().join(' '), {emitEvent: false}));
  
  control = new FormControl<string>("" , {validators: payloadValidator(), updateOn: 'blur'});
  $control = this.control.valueChanges
  .subscribe((v) => this.payload.set(v?.split(' ').map(el=>+el).filter(el => !isNaN(el))??[]));
  }
