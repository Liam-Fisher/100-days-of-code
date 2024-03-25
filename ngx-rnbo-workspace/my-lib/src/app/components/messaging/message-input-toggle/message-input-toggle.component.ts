import { Component, EventEmitter, Input, Output, effect, inject, input, model } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessagingUiService } from '../../../services/messaging/messaging-ui.service';
import { PortType } from '../../../types/messaging';

@Component({
  selector: 'ngx-message-port-mode-toggle',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <input type="checkbox" [formControl]="control" />
  `,
  styles: ``
})
export class MessagePortModeToggleComponent {
  control = new FormControl<boolean>(false, {nonNullable: true});
  $control = this.control.valueChanges.subscribe((v) => this.valueChange.emit(v));
  @Input() set value (v: boolean) {
    this.control.setValue(v);
  }
  @Output() valueChange = new EventEmitter<boolean>();
}
