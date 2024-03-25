import { Component, Input, computed, effect, inject, input, model } from '@angular/core';
import { NgxPortInfo } from '../../../types/messaging';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-message-port-tag-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <select #selectTag [formControl]="control" >
  @for(port of ports(); track $index) {
    <option [value]="port">{{port.tag}}</option>
  }
  </select>
  `,
  styles: ``
})
export class MessagePortTagSelectComponent {
  
  ports = input<NgxPortInfo[]>([]);
  
  displayMode = input<boolean>(false);
  value = model<string>('');
  control = new FormControl<NgxPortInfo|null>(null, {validators: Validators.required});

  setEffect = effect(() => this.control.setValue(this.ports().find((p) => p.tag === this.value())??null));
  getSubscription = this.control.valueChanges.subscribe((v) => this.value.set(v?.tag??''));

}
