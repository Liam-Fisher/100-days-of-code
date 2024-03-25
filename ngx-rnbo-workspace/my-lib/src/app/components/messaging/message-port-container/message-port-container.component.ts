import { Component, EventEmitter, computed, effect, inject, input, model, untracked, viewChild } from '@angular/core';
import { MessagePayloadInputComponent } from '../message-payload-input/message-payload-input.component';
import { MessagePortTagSelectComponent } from '../message-port-tag-select/message-port-tag-select.component';
import { MessagePortModeToggleComponent } from '../message-input-toggle/message-input-toggle.component';
import { MessageTimeInputComponent } from '../message-time-input/message-time-input.component';
import { NgxPortInfo, PortMessage } from '../../../types/messaging';
import { MessageSendButtonComponent } from '../message-send-button/message-send-button.component';

@Component({
  selector: 'ngx-message-port-container',
  standalone: true,
  imports: [MessagePayloadInputComponent, MessagePortTagSelectComponent, MessagePortModeToggleComponent, MessageTimeInputComponent, MessageSendButtonComponent],
  template: `

<!--   <ngx-message-port-mode-toggle [(value)]="displayMode"></ngx-message-port-mode-toggle>
  <ngx-message-time-input [(value)]="time"></ngx-message-time-input>
  <ngx-message-port-tag-select  [(value)]="tag" [ports]="ports()"></ngx-message-port-tag-select>

<ngx-message-payload-input  [(value)]="payload"></ngx-message-payload-input> -->
   <ngx-message-send-button (click)="send()"></ngx-message-send-button> 
  
  `,
  styles: ``
})
export class MessagePortContainerComponent {


  ports = input.required<NgxPortInfo[]>();
  //modeElement = viewChild(MessagePortModeToggleComponent);

  //tagElement = viewChild(MessagePortTagSelectComponent);
  //payloadElement = viewChild(MessagePayloadInputComponent);
  //timeElement = viewChild(MessageTimeInputComponent);
  displayMode = false;
  time = 0;
  tag = '';
  payload: number[] = [];
  //displayMode = computed<boolean>(() => this.modeElement()?.value()??false);
  
  //time = computed<number>(() => this.timeElement()?.value()??0);
  //tag = computed<string>(() => this?.tagElement()?.value()??'');
  //payload = computed<number[]>(() => this.payloadElement()?.value()??[]);
  activeMessage = model<PortMessage>([0, '', []]);

  receive = effect(() => {
    let message = this.activeMessage();
    if(this.displayMode&&message) {
      [this.time, this.tag, this.payload] = message;
    }
  });
  send() {
    if(!this.displayMode) {
      this.activeMessage.set([this.time, this.tag, this.payload]);
    }
  }
}
