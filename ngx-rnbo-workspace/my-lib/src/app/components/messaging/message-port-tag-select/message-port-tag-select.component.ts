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
  @for(port of ports(); track $index) {
    <option [value]="$index" >{{port.tag}}</option>
  }
  </select>
  `,
  styles: ``
})
export class MessagePortTagSelectComponent {
  displayMode = input<boolean>(false);
  ports = input.required<NgxPortInfo[]>();
  portTags = computed(() => this.ports().map((port) => port.tag));
  portSelected = model<NgxPortInfo|null>(null);
  select = effect(() => console.log(`selecting port ${this.portSelected()?.tag??''}`));
  control = new FormControl<number|null>(null, {validators: Validators.required});
  $control = this.control.valueChanges.subscribe((v) => {
    console.log(v);
    let port = this.ports()[v??0]??null;
    let tag = port?.tag??'';
    console.log(`port input value ${tag}`);
    if(tag) {
      this.portChange.emit(tag);
    }
  });
  selectPort(e: any) {
    let p = e.target.value;
    console.log(`selecting port ${p.tag}`);

this.portChange.emit(p.tag);  
  }
  @Input() set port(p: string)  {
    this.control.setValue(this.portTags()?.indexOf(p)??0);
  }
  @Output() portChange = new EventEmitter<string>();
  

}
