import { Component, ViewChild, computed } from '@angular/core';
import { MessagePortModeComponent } from './message-port-mode-ui.component';
import { MessageTagComponent } from './message-tag-ui.component';
import { MessagePayloadComponent } from './message-payload-ui.component';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { RnboMessagingService } from '../../services/messaging/rnbo-messaging-service.service';

@Component({
  selector: 'ngx-rnbo-inport',
  standalone: true,
  imports: [MessagePortModeComponent, MessageTagComponent, MessagePayloadComponent, AsyncPipe],
  template: ` 
  <ngx-message-port-mode #inport_mode [value]="'input'"></ngx-message-port-mode>

 @if((inport_mode.ctl.valueChanges|async) === 'input') {
   <ngx-message-tag-select #inport_tag [ports]="messaging.outports" label="outports"></ngx-message-tag-select>
   @if((inport_tag.ctl.statusChanges|async) === 'VALID') {
   <ngx-message-payload-input [port]="(inport_tag.ctl.valueChanges|async)"></ngx-message-payload-input>
     <button mat-raised-button color="primary" [disabled]="payloadInput.ctl.invalid" 
       (click)="send()">
       Send
     </button>
   }
 }
 @else if ((inport_mode.ctl.valueChanges|async) === 'show') {
     <p>Tag: {{deviceInTag()}}</p>
     <p>Data: {{deviceInData()}}</p>
 }
 @else {
   <p>Output port is hidden</p>
 }
  `,
  styles: ``
})
export class RnboMessageInportComponent {
  deviceIn = toSignal(this.messaging.inport, {initialValue: ['', []]});
  deviceInTag = computed(() => this.deviceIn()?.[0]??'');
  deviceInData = computed(() => this.deviceIn()?.[1].join(' '));

  @ViewChild(MessageTagComponent) tagSelect!: MessageTagComponent;
  @ViewChild(MessagePayloadComponent) payloadInput!: MessagePayloadComponent;

  
  constructor() {} 
  send() {
    let tag = this?.tagSelect.value?.tag;
    let payload = this?.payloadInput.value;
    if(tag && payload!==null) {
      this.messaging.input = [tag, payload];
    }
  }

}
