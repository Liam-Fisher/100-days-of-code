import { Component, Input, computed, inject, input } from '@angular/core';
import { NgxPortInfo } from '../../../types/messaging';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-message-port-tag-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <select #selectTag [formControl]="portTagSelectionControl" >
  @for(port of ports(); track $index) {
    <option [value]="port">{{port.tag}}</option>
  }
  </select>
  `,
  styles: ``
})
export class MessagePortTagSelectComponent {
  ports = input<NgxPortInfo[]>([]);
  portTagSelectionControl = new FormControl<NgxPortInfo|null>(null);
  @Input() set value(v: NgxPortInfo|null) {
    this.portTagSelectionControl.setValue(v);
  }
  get value() {
    return this.portTagSelectionControl.value;
  }

}
