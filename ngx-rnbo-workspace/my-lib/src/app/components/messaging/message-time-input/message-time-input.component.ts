import { Component, EventEmitter, Input, Output, computed, effect, inject, input, model } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessagingUiService } from '../../../services/messaging/messaging-ui.service';
import { PortType } from '../../../types/messaging';

@Component({
  selector: 'ngx-message-time-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input type="number" [formControl]="control" />
  `,
  styles: ``
})
export class MessageTimeInputComponent {
  displayMode = input<boolean>(false);
  $displayMode = effect(() => this.displayMode() ? this.control.disable() : this.control.enable());
  time = model<number>(0);
  $time = effect(() => this.control.setValue(this.time().toString(), {emitEvent: false}));
  control = new FormControl<string>('0', {nonNullable: true});
  $control = this.control.valueChanges
  .subscribe((v) => this.time.set(+isNaN(+v)?0:(+v)));
}
