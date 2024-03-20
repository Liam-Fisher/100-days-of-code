import { Component, ViewChild, computed } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MessageTagComponent } from './message-tag-ui.component';
import { MessagePayloadComponent } from './message-payload-ui.component';
import { MessagePortModeComponent } from './message-port-mode-ui.component';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { RnboMessagingService } from './rnbo-messaging.service';

@Component({
  selector: 'ngx-rnbo-outport',
  standalone: true,
  imports: [MatButtonToggleModule, ReactiveFormsModule, MessageTagComponent, MessagePayloadComponent, MessagePortModeComponent, AsyncPipe],
  template: `  
  <ngx-message-port-mode #outport_mode [value]="'show'"></ngx-message-port-mode>

  @if((outport_mode.ctl.valueChanges|async) === 'input') {
    <ngx-message-tag-select #outport_tag [ports]="messaging.outports" label="outports"></ngx-message-tag-select>
    @if((outport_tag.ctl.statusChanges|async) === 'VALID') {
    <ngx-message-payload-input [port]="(outport_tag.ctl.valueChanges|async)"></ngx-message-payload-input>
      <button mat-raised-button color="primary" [disabled]="payloadInput.ctl.invalid" 
        (click)="send()">
        Send
      </button>
    }
  }
  @else if ((outport_mode.ctl.valueChanges|async) === 'show') {
      <p>Tag: {{deviceOutTag()}}</p>
      <p>Data: {{deviceOutData()}}</p>
  }
  @else {
    <p>Output port is hidden</p>
  }
  `,
  styles: ``
})
export class RnboMessageOutportComponent {
  deviceOut = toSignal(this.messaging.outport, {initialValue: ['', []]});
  deviceOutTag = computed(() => this.deviceOut()?.[0]??'');
  deviceOutData = computed(() => this.deviceOut()?.[1].join(' '));

  @ViewChild(MessagePortModeComponent) modeToggle!: MessagePortModeComponent;
  @ViewChild(MessageTagComponent) tagSelect!: MessageTagComponent;
  @ViewChild(MessagePayloadComponent) payloadInput!: MessagePayloadComponent;
/* 
  deviceOutputTag = computed(() => this.deviceOut()?.[0]??''); 
  deviceOutputData = computed(() => this.deviceOut()?.[1].join(' ')); */
  constructor(public messaging: RnboMessagingService) {} 
  send() {
    let tag = this?.tagSelect.value?.tag;
    let payload = this?.payloadInput.value;
    if(tag && payload!==null) {
      this.messaging.output = [tag, payload];
    }
  }
}
