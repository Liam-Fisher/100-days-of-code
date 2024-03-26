import { Component, EventEmitter, Input, Output, computed, effect, inject, input, model } from '@angular/core';
import { NgxPortInfo } from '../../../types/messaging';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessagingUiService } from '../../../services/messaging/messaging-ui.service';

@Component({
  selector: 'ngx-message-port-tag-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <select #selectTag [formControl]="control">
  <option value="0">--Select a tag--</option>
  @for(port of ports(); track $index) {
    <option [value]="$index+1" >{{port.tag}}</option>
  }
  </select>
  `,
  styles: ``
})
export class MessagePortTagSelectComponent {
  displayMode = input<boolean>(false);
  $displayMode = effect(() => this.displayMode()? this.control.disable() : this.control.enable());
  ports = input.required<NgxPortInfo[]>();
  portTags = computed(() => this.ports().map((port) => port.tag));
  tag = model<string>('');
  $tag = effect(() => this.control.setValue(this.portTags().indexOf(this.tag())+1, {emitEvent: false}));
  port = computed(() => this.ports().find((port) => port.tag === this.tag())??null);
  control = new FormControl<number|null>(0, {validators: Validators.required});
  $control = this.control.valueChanges
  .subscribe((v) => {  
    if(v) this.tag.set(this.portTags()[v-1]??'');
  });
}
