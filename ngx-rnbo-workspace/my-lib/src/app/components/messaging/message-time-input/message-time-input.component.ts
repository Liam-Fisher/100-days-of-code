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
  control = new FormControl<string|null>('0');
  $control = this.control.valueChanges.subscribe((v) => !isNaN(+(v+''))?this.timeChange.emit(+(v+'')):this.control.setValue('0'));
  @Input() set time (time: number) {
    this.control.setValue(time.toString());
  }
  @Output() timeChange = new EventEmitter<number>();
}
